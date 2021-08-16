import { Document, Types } from 'mongoose';
export declare type CartDocument = Cart & Document;
export declare class Cart {
    owner: Types.ObjectId;
    status: number;
}
export declare const CartSchema: import("mongoose").Schema<Document<Cart, any, any>, import("mongoose").Model<any, any, any>, undefined, any>;
