import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Category } from "./category.schema";

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop({type: Types.ObjectId, ref: Category.name})
    category_id: Types.ObjectId;

    @Prop({type: Types.ObjectId, ref: Category.name})
    brand_id: Types.ObjectId;

    @Prop()
    price: number;

    @Prop()
    ratting: number;

    @Prop()
    status: string; //New, Like new, Old

    @Prop()
    import_date: number;

    @Prop()
    image: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);