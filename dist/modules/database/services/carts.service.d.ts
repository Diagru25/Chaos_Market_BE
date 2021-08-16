import { Model } from 'mongoose';
import { CartDetailDocument, CartDocument } from '../schema';
export declare class CartsService {
    private CartModel;
    private CartDetailModel;
    constructor(CartModel: Model<CartDocument>, CartDetailModel: Model<CartDetailDocument>);
    findByOwner(userId: string): Promise<any>;
    addToCart(userId: string, data: any): Promise<any>;
}
