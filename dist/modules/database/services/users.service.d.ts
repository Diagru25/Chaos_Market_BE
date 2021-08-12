import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/user.schema';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    delete(id: string): Promise<any>;
    update(id: string, data: User, currentUser: any): Promise<any>;
    create(entity: User): Promise<User>;
}
