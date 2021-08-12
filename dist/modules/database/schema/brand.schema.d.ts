import { Document } from 'mongoose';
export declare type BrandDocument = Brand & Document;
export declare class Brand {
    name: string;
    description: string;
}
export declare const BrandSchema: import("mongoose").Schema<Document<Brand, any, any>, import("mongoose").Model<any, any, any>, undefined, any>;
