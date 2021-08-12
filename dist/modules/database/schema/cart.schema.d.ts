import { Document, Types } from 'mongoose';
import { Product } from './product.schema';
export declare type CartDocument = Cart & Document;
export declare class Cart {
    owner: Types.ObjectId;
    items: Array<{
        product: Product;
        quantity: number;
    }>;
}
export declare const CartSchema: import("mongoose").Schema<Document<Cart, any, any>, import("mongoose").Model<any, any, any>, undefined, any>;
