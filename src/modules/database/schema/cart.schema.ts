import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

export type CartDocument = Cart & Document;

@Schema()
export class Cart {
    @Prop({ required: true, type: Types.ObjectId, ref: User.name })
    owner: Types.ObjectId;

    @Prop()
    status: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
