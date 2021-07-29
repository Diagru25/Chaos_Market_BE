import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';
import { Product } from './product.schema';

export type CardDocument = Card & Document;

@Schema()
export class Card {
    @Prop({ required: true, type: Types.ObjectId, ref: User.name })
    owner: Types.ObjectId;

    @Prop({ default: [] })
    items: Array<{ product: Product; quantity: number }>; //{product: Product, quantity: number}
}

export const CardSchema = SchemaFactory.createForClass(Card);
