import { InjectModel } from '@nestjs/mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Cart, CartDetail, CartDetailDocument, CartDocument } from '../schema';
import apiResponse from 'src/helpers/api-response';

let ObjectId = Types.ObjectId;

@Injectable()
export class CartsService {
    constructor(
        @InjectModel(Cart.name) private CartModel: Model<CartDocument>,
        @InjectModel(CartDetail.name)
        private CartDetailModel: Model<CartDetailDocument>,
    ) {}

    async findByOwner(userId: string): Promise<any> {
        try {
            const realUserId = new ObjectId(userId);

        const cart = await this.CartModel.findOne({ owner: realUserId }).exec();
        const cartItems = await this.CartDetailModel.find({
            cartId: cart._id,
        })
            .populate('product', ['_id', 'name', 'image', 'price', 'description', 'discount'])
            .exec();

        return apiResponse(
            HttpStatus.OK,
            {
                cart,
                items: cartItems,
                total: cartItems.length,
            },
            'success',
        );
        } catch (error) {
            return apiResponse(HttpStatus.INTERNAL_SERVER_ERROR, {}, '', error);
        }
        
    }

    async addToCart(userId: string, data: any): Promise<any> {
        const owner = new ObjectId(userId);

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
            } else {
                await this.CartDetailModel.updateOne(
                    { _id: foundCartDetail._id },
                    { quantity: foundCartDetail.quantity + 1 },
                );
            }

            return apiResponse(HttpStatus.CREATED, {}, 'success');
        } catch (error) {
            return apiResponse(HttpStatus.INTERNAL_SERVER_ERROR, {}, '', error);
        }
    }
}
