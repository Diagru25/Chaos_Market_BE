"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../schema/user.schema");
const bcrypt = require("bcrypt");
const roles_enum_1 = require("../../../configs/roles.enum");
let ObjectId = mongoose_2.Types.ObjectId;
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findAll() {
        return this.userModel.find().exec();
    }
    async findOne(id) {
        const realId = new ObjectId(id);
        return this.userModel.findById(realId).exec();
    }
    async delete(id) {
        const realId = new ObjectId(id);
        return this.userModel.findByIdAndDelete(realId).exec();
    }
    async update(id, data, currentUser) {
        const realId = new ObjectId(id);
        let foundUser = null;
        if (currentUser.role === roles_enum_1.Role.Root) {
            return this.userModel
                .findOneAndUpdate(realId, data, { new: true })
                .exec();
        }
        else if (currentUser.role === roles_enum_1.Role.Admin) {
            foundUser = await this.userModel.findById(realId);
            if (foundUser.role != roles_enum_1.Role.Root) {
                return this.userModel
                    .findOneAndUpdate({ _id: realId }, data, { new: true })
                    .exec();
            }
            else {
                return {
                    statusCode: 403,
                    message: 'You can not update the root account',
                    error: 'Forbidden',
                };
            }
        }
        else {
            foundUser = await this.userModel.findById(realId);
            if (foundUser.role != roles_enum_1.Role.User) {
                return {
                    statusCode: 403,
                    message: 'You can not update the root or admin account',
                    error: 'Forbidden',
                };
            }
            else {
                return this.userModel
                    .findOneAndUpdate({ _id: realId }, data, { new: true })
                    .exec();
            }
        }
    }
    async create(entity) {
        entity.password = await bcrypt.hash(entity.password, 10);
        const newUser = new this.userModel(entity);
        return newUser.save();
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map