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
exports.CartsService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("mongoose");
const schema_1 = require("../schema");
let ObjectId = mongoose_2.Types.ObjectId;
let CartsService = class CartsService {
    constructor(CartModel) {
        this.CartModel = CartModel;
    }
    async findByOwner(userId) {
        const realUserId = new ObjectId(userId);
        return this.CartModel.findOne({ owner: realUserId }).exec();
    }
    async createCart(userId, data) {
        const convertData = Object.assign(Object.assign({}, data), { owner: new ObjectId(userId) });
        return this.CartModel.create(convertData);
    }
};
CartsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(schema_1.Cart.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CartsService);
exports.CartsService = CartsService;
//# sourceMappingURL=carts.service.js.map