import { InjectModel } from '@nestjs/mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Cart, CartDetail, CartDetailDocument, CartDocument } from '../schema';

let ObjectId = Types.ObjectId;

@Injectable()
export class CartsService {
    constructor(
        @InjectModel(Cart.name) private CartModel: Model<CartDocument>,
        @InjectModel(CartDetail.name)
        private CartDetailModel: Model<CartDetailDocument>,
    ) {}

    async findByOwner(userId: string): Promise<any> {
        const realUserId = new ObjectId(userId);

        const cart = await this.CartModel.findOne({ owner: realUserId }).exec();
        const cartItems = await this.CartDetailModel.find({
            cartId: cart._id,
        })
            .populate('product', ['_id', 'name', 'image', 'price'])
            .exec();

        return {
            statusCode: HttpStatus.OK,
            data: {
                cart,
                items: cartItems,
                total: cartItems.length,
            },
            _v: 0,
        };
    }

    async addToCart(userId: string, data: any): Promise<any> {
        const owner = new ObjectId(userId);

        console.log(data);

        try {
            let foundCart = await this.CartModel.findOne({
                owner: owner,
            }).exec();

            if (!foundCart) {
                foundCart = await this.CartModel.create({
                    owner: owner,
                    status: 0,
                });
            }

            let foundCartDetail = await this.CartDetailModel.findOne({
                cartId: foundCart._id,
                product: new ObjectId(data.productId),
            }).exec();

            if (!foundCartDetail) {
                await this.CartDetailModel.create({
                    cartId: foundCart._id,
                    product: new ObjectId(data.productId),
                    quantity: Number(data.quantity),
                });
            }
            else {
                await foundCartDetail.update({quantity: foundCartDetail.quantity + 1}).exec();
            }


            return {
                statusCode: HttpStatus.CREATED,
                message: 'success',
                _v: 0,
            };
        } catch (error) {
            console.log;
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                error: error,
                _v: 0,
            };
        }
    }
}
