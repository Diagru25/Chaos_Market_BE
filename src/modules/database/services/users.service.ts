import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User, UserDocument } from "../schema/user.schema";
import * as bcrypt from 'bcrypt';

let ObjectId = Types.ObjectId;
@Injectable()
export class UsersService{
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ){}

    async findAll(): Promise<User[]>{
        return this.userModel.find().exec();
    }

    async findOne(id: string): Promise<User> {
        const realId = new ObjectId(id)
        return this.userModel.findById(realId).exec();
    }

    async delete(id: string): Promise<any> {
        const realId = new ObjectId(id);
        return this.userModel.findByIdAndDelete(realId).exec();
    }

    async update(id: string, data: User): Promise<any> {
        const realId = new ObjectId(id);
        return this.userModel.findOneAndUpdate(realId, data, {new: true}).exec();
    }

    async create(entity: User): Promise<User> {
        entity.password = await bcrypt.hash(entity.password, 10);

        const newUser = new this.userModel(entity);
        return newUser.save();
    }

}