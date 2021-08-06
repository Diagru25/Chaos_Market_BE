import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Cart, CartDocument } from '../schema';

let ObjectId = Types.ObjectId;

@Injectable()
export class CartsService {
    constructor(
        @InjectModel(Cart.name) private CartModel: Model<CartDocument>,
    ) {}

    async findByOwner(userId: string): Promise<Cart> {
        const realUserId = new ObjectId(userId);
        return this.CartModel.findOne({ owner: realUserId }).exec();
    }

    async createCart(userId: string, data: Cart): Promise<Cart> {
        const convertData = {
            ...data,
            owner: new ObjectId(userId)
        };

        return this.CartModel.create(convertData);
    }
}
