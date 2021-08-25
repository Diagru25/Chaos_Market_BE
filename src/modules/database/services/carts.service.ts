import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
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

        const cart = await this.CartModel.findOne({
            owner: realUserId,
        }).exec();

        if (!cart)
            return {
                cart,
                items: [],
                total: 0,
            };

        const cartItems = await this.CartDetailModel.find({
            cartId: cart._id,
        })
            .populate('product', [
                '_id',
                'name',
                'image',
                'price',
                'description',
                'discount',
            ])
            .exec();

        return {
            cart,
            items: cartItems,
            total: cartItems.length,
        };
    }

    async addToCart(userId: string, data: any): Promise<boolean> {
        const owner = new ObjectId(userId);

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

        return true;
    }

    async updateQuantityCartDetail(
        cartDetailId: string,
        quantity: number,
    ): Promise<CartDetail> {
        const realId = new ObjectId(cartDetailId);

        const updatedCartDetail = await this.CartDetailModel.findByIdAndUpdate(
            realId,
            { quantity: quantity },
            {
                new: true,
                useFindAndModify: false,
            },
        );

        return updatedCartDetail;
    }

    async deleteCartDetail(cartDetailId: string): Promise<CartDetail> {
        const realId = new ObjectId(cartDetailId);

        const deletedCartDetail = await this.CartDetailModel.findByIdAndDelete(
            realId,
        );

        const cartId = deletedCartDetail.cartId;
        const cartDetailList = await this.CartDetailModel.find({
            cartId: cartId,
        }).exec();

        if (cartDetailList.length === 0)
            await this.CartModel.findByIdAndDelete(cartId);

        return deletedCartDetail;
    }
}
