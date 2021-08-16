
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {Cart} from './cart.schema';
import { Product } from './product.schema';

export type CartDetailDocument = CartDetail & Document;

@Schema()
export class CartDetail {
    @Prop({ required: true, type: Types.ObjectId, ref: Cart.name })
    cartId: Types.ObjectId;

    @Prop({ required: true, type: Types.ObjectId, ref: Product.name })
    product: Types.ObjectId;

    @Prop()
    quantity: number;
}

export const CartDetailSchema = SchemaFactory.createForClass(CartDetail);
