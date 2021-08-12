import { UsersService } from '../database/services/users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findOne(req: any): Promise<import("../database/schema").User>;
    findAll(): Promise<import("../database/schema").User[]>;
    create(data: any): Promise<import("../database/schema").User>;
    update(data: any, id: string, req: any): Promise<any>;
}
