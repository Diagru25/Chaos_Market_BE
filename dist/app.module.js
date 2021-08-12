"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const keys_1 = require("./configs/keys");
const database_module_1 = require("./modules/database/database.module");
const brands_module_1 = require("./modules/brands/brands.module");
const products_module_1 = require("./modules/products/products.module");
const categories_module_1 = require("./modules/categories/categories.module");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const resources_module_1 = require("./modules/resources/resources.module");
const carts_module_1 = require("./modules/carts/carts.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forRoot(keys_1.default.mongoURI),
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            brands_module_1.BrandsModule,
            categories_module_1.CategoriesModule,
            products_module_1.ProductsModule,
            users_module_1.UsersModule,
            resources_module_1.ResourcesModule,
            carts_module_1.CartsModule
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map