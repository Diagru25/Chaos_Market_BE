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
    constructor(CartModel, CartDetailModel) {
        this.CartModel = CartModel;
        this.CartDetailModel = CartDetailModel;
    }
    async findByOwner(userId) {
        const realUserId = new ObjectId(userId);
        const cart = await this.CartModel.findOne({ owner: realUserId }).exec();
        const cartItems = await this.CartDetailModel.find({
            cartId: cart._id,
        })
            .populate('product', ['_id', 'name', 'image', 'price'])
            .exec();
        return {
            statusCode: common_1.HttpStatus.OK,
            data: {
                cart,
                items: cartItems,
                total: cartItems.length,
            },
            _v: 0,
        };
    }
    async addToCart(userId, data) {
        const owner = new ObjectId(userId);
        console.log(data);
        try {
            let foundCart = await this.CartModel.findOne({
                owner: owner,
            }).exec();
            if (!foundCart) {
                foundCart = await this.CartModel.create({
                    owner: owner,
                    status: 0,
                });
            }
            let foundCartDetail = await this.CartDetailModel.findOne({
                cartId: foundCart._id,
                product: new ObjectId(data.productId),
            }).exec();
            if (!foundCartDetail) {
                await this.CartDetailModel.create({
                    cartId: foundCart._id,
                    product: new ObjectId(data.productId),
                    quantity: Number(data.quantity),
                });
            }
            else {
                await foundCartDetail.update({ quantity: foundCartDetail.quantity + 1 }).exec();
            }
            return {
                statusCode: common_1.HttpStatus.CREATED,
                message: 'success',
                _v: 0,
            };
        }
        catch (error) {
            console.log;
            return {
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: error,
                _v: 0,
            };
        }
    }
};
CartsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(schema_1.Cart.name)),
    __param(1, mongoose_1.InjectModel(schema_1.CartDetail.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CartsService);
exports.CartsService = CartsService;
//# sourceMappingURL=carts.service.js.map