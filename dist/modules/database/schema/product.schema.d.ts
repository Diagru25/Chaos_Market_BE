import { Document, Types } from 'mongoose';
export declare type ProductDocument = Product & Document;
export declare class Product {
    name: string;
    description: string;
    category_id: Types.ObjectId;
    brand_id: Types.ObjectId;
    price: number;
    rating: number;
    status: string;
    import_date: number;
    image: string;
    sold: number;
}
export declare const ProductSchema: import("mongoose").Schema<Document<Product, any, any>, import("mongoose").Model<any, any, any>, undefined, any>;
