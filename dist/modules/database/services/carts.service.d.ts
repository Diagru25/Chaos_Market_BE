import { Model } from 'mongoose';
import { Cart, CartDocument } from '../schema';
export declare class CartsService {
    private CartModel;
    constructor(CartModel: Model<CartDocument>);
    findByOwner(userId: string): Promise<Cart>;
    createCart(userId: string, data: Cart): Promise<Cart>;
}
