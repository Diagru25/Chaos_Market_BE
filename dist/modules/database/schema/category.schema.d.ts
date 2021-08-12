import { Document } from "mongoose";
export declare type CategoryDocument = Category & Document;
export declare class Category {
    name: string;
    description: string;
}
export declare const CategorySchema: import("mongoose").Schema<Document<Category, any, any>, import("mongoose").Model<any, any, any>, undefined, any>;
