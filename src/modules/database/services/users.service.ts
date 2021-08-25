import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../schema/user.schema';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/configs/roles.enum';
import apiResponse from 'src/helpers/api-response';

let ObjectId = Types.ObjectId;
@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) {}

    async findAll(): Promise<User[]> {
        const items = await this.userModel.find().exec();
        return items;
    }

    async findOne(id: string): Promise<User> {
        const realId = new ObjectId(id);
        const foundUser = await this.userModel.findById(realId).exec();
        return foundUser;
    }

    async delete(id: string): Promise<User> {
        const realId = new ObjectId(id);
        const deletedUser = await this.userModel
            .findByIdAndDelete(realId)
            .exec();
        return deletedUser;
    }

    async update(id: string, data: User, currentUser: any): Promise<User> {
        const realId = new ObjectId(id);
        let foundUser = null;

        if (currentUser.role === Role.Root) {
            const updatedUser = await this.userModel
                .findOneAndUpdate({ _id: realId }, data, { new: true })
                .exec();

            return updatedUser;
        } else if (currentUser.role === Role.Admin) {
            foundUser = await this.userModel.findById(realId);
            if (foundUser.role != Role.Root) {
                const updatedUser = await this.userModel
                    .findOneAndUpdate({ _id: realId }, data, { new: true })
                    .exec();
                return updatedUser;
            } else {
                return null;
            }
        } else {
            foundUser = await this.userModel.findById(realId);
            if (foundUser.role != Role.User) {
                return null;
            } else {
                const updatedUser = await this.userModel
                    .findOneAndUpdate({ _id: realId }, data, { new: true })
                    .exec();

                return updatedUser;
            }
        }
    }

    async create(entity: User): Promise<User> {
        entity.password = await bcrypt.hash(entity.password, 10);

        const newUser = await this.userModel.create(entity);
        return newUser;
    }
}
