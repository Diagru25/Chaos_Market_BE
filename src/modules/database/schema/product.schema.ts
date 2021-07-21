import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from './category.schema';
import { Brand } from './brand.schema';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: Category.name })
  category_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Brand.name })
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

  @Prop()
  sold: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
