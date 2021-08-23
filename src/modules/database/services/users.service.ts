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

    async findAll(): Promise<any> {
        try {
            const items = await this.userModel.find().exec();
            return apiResponse(
                HttpStatus.OK,
                { items, total: items.length },
                'success',
            );
        } catch (error) {
            return apiResponse(HttpStatus.INTERNAL_SERVER_ERROR, {}, '', error);
        }
    }

    async findOne(id: string): Promise<any> {
        try {
            const realId = new ObjectId(id);
            const foundUser = await this.userModel.findById(realId).exec();
            return apiResponse(HttpStatus.OK, { user: foundUser }, 'success');
        } catch (error) {
            return apiResponse(HttpStatus.INTERNAL_SERVER_ERROR, {}, '', error);
        }
    }

    async delete(id: string): Promise<any> {
        try {
            const realId = new ObjectId(id);
            const deletedUser = await this.userModel
                .findByIdAndDelete(realId)
                .exec();
            return apiResponse(HttpStatus.OK, { user: deletedUser }, 'success');
        } catch (error) {
            return apiResponse(HttpStatus.INTERNAL_SERVER_ERROR, {}, ', error');
        }
    }

    async update(id: string, data: User, currentUser: any): Promise<any> {
        try {
            const realId = new ObjectId(id);
            let foundUser = null;

            if (currentUser.role === Role.Root) {
                const updatedUser = await this.userModel
                    .findOneAndUpdate({ _id: realId }, data, { new: true })
                    .exec();

                return apiResponse(
                    HttpStatus.OK,
                    { user: updatedUser },
                    'success',
                );
            } else if (currentUser.role === Role.Admin) {
                foundUser = await this.userModel.findById(realId);
                if (foundUser.role != Role.Root) {
                    const updatedUser = await this.userModel
                        .findOneAndUpdate({ _id: realId }, data, { new: true })
                        .exec();
                    return apiResponse(
                        HttpStatus.OK,
                        { user: updatedUser },
                        'success',
                    );
                } else {
                    return apiResponse(
                        HttpStatus.FORBIDDEN,
                        {},
                        'You can not update the root account',
                        'Forbidden',
                    );
                }
            } else {
                foundUser = await this.userModel.findById(realId);
                if (foundUser.role != Role.User) {
                    return apiResponse(
                        HttpStatus.FORBIDDEN,
                        {},
                        'You can not update the root or admin account',
                        'Forbidden',
                    );
                } else {
                    const updatedUser = await this.userModel
                        .findOneAndUpdate({ _id: realId }, data, { new: true })
                        .exec();

                    return apiResponse(
                        HttpStatus.OK,
                        { user: updatedUser },
                        'success',
                    );
                }
            }
        } catch (error) {
            return apiResponse(HttpStatus.INTERNAL_SERVER_ERROR, {}, '', error);
        }
    }

    async create(entity: User): Promise<User> {
        entity.password = await bcrypt.hash(entity.password, 10);

        const newUser = new this.userModel(entity);
        return newUser.save();
    }
}
