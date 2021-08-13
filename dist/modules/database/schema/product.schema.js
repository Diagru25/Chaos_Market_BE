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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = exports.Product = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const category_schema_1 = require("./category.schema");
const brand_schema_1 = require("./brand.schema");
let Product = class Product {
};
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    mongoose_1.Prop({ type: mongoose_2.Types.ObjectId, ref: category_schema_1.Category.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Product.prototype, "category_id", void 0);
__decorate([
    mongoose_1.Prop({ type: mongoose_2.Types.ObjectId, ref: brand_schema_1.Brand.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Product.prototype, "brand_id", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Number)
], Product.prototype, "rating", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Product.prototype, "status", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Number)
], Product.prototype, "import_date", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Product.prototype, "image", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Number)
], Product.prototype, "sold", void 0);
__decorate([
    mongoose_1.Prop({ default: [] }),
    __metadata("design:type", Array)
], Product.prototype, "properties", void 0);
Product = __decorate([
    mongoose_1.Schema()
], Product);
exports.Product = Product;
exports.ProductSchema = mongoose_1.SchemaFactory.createForClass(Product);
//# sourceMappingURL=product.schema.js.map