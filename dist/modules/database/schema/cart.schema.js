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
exports.CartSchema = exports.Cart = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema");
let Cart = class Cart {
};
__decorate([
    mongoose_1.Prop({ required: true, type: mongoose_2.Types.ObjectId, ref: user_schema_1.User.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Cart.prototype, "owner", void 0);
__decorate([
    mongoose_1.Prop({ default: [] }),
    __metadata("design:type", Array)
], Cart.prototype, "items", void 0);
Cart = __decorate([
    mongoose_1.Schema()
], Cart);
exports.Cart = Cart;
exports.CartSchema = mongoose_1.SchemaFactory.createForClass(Cart);
//# sourceMappingURL=cart.schema.js.map