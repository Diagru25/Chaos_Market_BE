"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const schema_1 = require("./schema");
const jwt_1 = require("@nestjs/jwt");
const brands_service_1 = require("./services/brands.service");
const products_service_1 = require("./services/products.service");
const categories_service_1 = require("./services/categories.service");
const users_service_1 = require("./services/users.service");
const auth_service_1 = require("./services/auth.service");
const carts_service_1 = require("./services/carts.service");
const keys_1 = require("../../configs/keys");
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: schema_1.Category.name,
                    schema: schema_1.CategorySchema,
                },
                {
                    name: schema_1.Brand.name,
                    schema: schema_1.BrandSchema,
                },
                {
                    name: schema_1.Product.name,
                    schema: schema_1.ProductSchema,
                },
                {
                    name: schema_1.User.name,
                    schema: schema_1.UserSchema,
                },
                {
                    name: schema_1.Cart.name,
                    schema: schema_1.CartSchema,
                },
            ]),
            jwt_1.JwtModule.register({
                secret: keys_1.default.JWT_SECRET,
                signOptions: {
                    expiresIn: '1d',
                },
            }),
        ],
        providers: [
            brands_service_1.BrandsService,
            categories_service_1.CategoriesService,
            products_service_1.ProductsService,
            users_service_1.UsersService,
            auth_service_1.AuthService,
            carts_service_1.CartsService,
        ],
        exports: [
            brands_service_1.BrandsService,
            categories_service_1.CategoriesService,
            products_service_1.ProductsService,
            users_service_1.UsersService,
            auth_service_1.AuthService,
            carts_service_1.CartsService,
        ],
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;
//# sourceMappingURL=database.module.js.map