import { Document } from "mongoose";
export declare type UserDocument = User & Document;
export declare class User {
    username: string;
    email: string;
    password?: string;
    googleId: string;
    facebookId: string;
    name: string;
    sex: string;
    address: string;
    role: string;
    avatar: string;
}
export declare const UserSchema: import("mongoose").Schema<Document<User, any, any>, import("mongoose").Model<any, any, any>, undefined, any>;
