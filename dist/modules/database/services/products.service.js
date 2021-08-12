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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schema_1 = require("../schema");
let ObjectId = mongoose_2.Types.ObjectId;
let ProductsService = class ProductsService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    async findAll() {
        return this.productModel.find().exec();
    }
    async create(data) {
        const convertData = Object.assign(Object.assign({}, data), { category_id: new ObjectId(data.category_id), brand_id: new ObjectId(data.brand_id) });
        return this.productModel.create(convertData);
    }
    async findOne(id) {
        const realId = new ObjectId(id);
        return this.productModel.findById(realId).exec();
    }
    async delete(id) {
        const realId = new ObjectId(id);
        return this.productModel.findByIdAndDelete(realId).exec();
    }
    async update(id, data) {
        const realId = new ObjectId(id);
        return this.productModel
            .findByIdAndUpdate(realId, Object.assign(Object.assign({}, data), { category_id: new ObjectId(data.category_id), brand_id: new ObjectId(data.brand_id) }))
            .exec();
    }
    async getBestSeller() {
        const bestSeller = this.productModel
            .find()
            .sort({ sold: -1 })
            .limit(8)
            .populate([
            { path: 'category_id', select: 'name' },
            { path: 'brand_id', select: 'name' },
        ])
            .exec();
        return bestSeller;
    }
    async getNewProducts() {
        const newProducts = this.productModel
            .find()
            .sort({ import_date: -1 })
            .limit(8)
            .exec();
        return newProducts;
    }
};
ProductsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map