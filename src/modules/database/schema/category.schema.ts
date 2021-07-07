import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
    @Prop()
    name: string;

    @Prop()
    description: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
