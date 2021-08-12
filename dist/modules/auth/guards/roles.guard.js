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
exports.RolesGuard = exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const passport_1 = require("@nestjs/passport");
const users_service_1 = require("../../database/services/users.service");
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => common_1.SetMetadata(exports.ROLES_KEY, roles);
exports.Roles = Roles;
let RolesGuard = class RolesGuard extends passport_1.AuthGuard('jwt') {
    constructor(reflector, usersService) {
        super();
        this.reflector = reflector;
        this.usersService = usersService;
    }
    async canActivate(context) {
        await super.canActivate(context);
        const requiredRoles = this.reflector.get(exports.ROLES_KEY, context.getHandler()) || [];
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const foundUser = await this.usersService.findOne(user.id);
        if (!foundUser)
            return false;
        else {
            return requiredRoles.some((role) => role === foundUser.role);
        }
    }
};
RolesGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [core_1.Reflector,
        users_service_1.UsersService])
], RolesGuard);
exports.RolesGuard = RolesGuard;
//# sourceMappingURL=roles.guard.js.map