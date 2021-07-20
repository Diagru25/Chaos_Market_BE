import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User{
    @Prop()
    username: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    name: string;

    @Prop()
    sex: number;

    @Prop()
    address: string;

    @Prop()
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);