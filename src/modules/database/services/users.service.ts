import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../schema/user.schema';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/configs/roles.enum';

let ObjectId = Types.ObjectId;
@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) {}

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(id: string): Promise<User> {
        const realId = new ObjectId(id);
        return this.userModel.findById(realId).exec();
    }

    async delete(id: string): Promise<any> {
        const realId = new ObjectId(id);
        return this.userModel.findByIdAndDelete(realId).exec();
    }

    async update(id: string, data: User, currentUser: any): Promise<any> {
        const realId = new ObjectId(id);
        let foundUser = null;

        if (currentUser.role === Role.Root) {
            return this.userModel
                .findOneAndUpdate({_id: realId}, data, { new: true })
                .exec();
        } else if (currentUser.role === Role.Admin) {
            foundUser = await this.userModel.findById(realId);
            if (foundUser.role != Role.Root) {
                return this.userModel
                    .findOneAndUpdate({_id: realId}, data, {new: true})
                    .exec();
            } else {
                return {
                    statusCode: 403,
                    message: 'You can not update the root account',
                    error: 'Forbidden',
                };
            }
        } else {
            foundUser = await this.userModel.findById(realId);
            if (foundUser.role != Role.User) {
                return {
                    statusCode: 403,
                    message: 'You can not update the root or admin account',
                    error: 'Forbidden',
                };
            } else {
                return this.userModel
                    .findOneAndUpdate({_id: realId}, data, { new: true })
                    .exec();
            }
        }
    }

    async create(entity: User): Promise<User> {
        entity.password = await bcrypt.hash(entity.password, 10);

        const newUser = new this.userModel(entity);
        return newUser.save();
    }
}
