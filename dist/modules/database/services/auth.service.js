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
exports.AuthService = void 0;
const user_schema_1 = require("../schema/user.schema");
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_2 = require("@nestjs/mongoose");
const googleapis_1 = require("googleapis");
const keys_1 = require("../../../configs/keys");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.oauthClient = new googleapis_1.google.auth.OAuth2(keys_1.default.googleConst.clientID, keys_1.default.googleConst.clientSecret);
    }
    async login(user) {
        const payload = {
            role: user.role,
            sub: user._id,
        };
        return {
            code: 200,
            user: user,
            message: 'success',
            access_token: this.jwtService.sign(payload),
        };
    }
    async validateUser(username, password) {
        const user = await this.userModel
            .findOne({
            $or: [{ username: username }, { email: username }],
        })
            .exec();
        if (!user)
            return {
                isValidate: false,
            };
        if (user && (await bcrypt.compare(password, user.password)))
            return {
                isValidate: true,
                user,
            };
        return {
            isValidate: false,
        };
    }
    async authenticateGoogle(token) {
        const tokenInfo = await this.oauthClient.getTokenInfo(token);
        const email = tokenInfo.email;
        const user = await this.userModel.findOne({ email: email }).exec();
        if (user) {
            return this.handleRegisteredUser(user);
        }
        return this.registerUserGoogle(token);
    }
    async getUserDataGoogle(token) {
        const userInfoClient = googleapis_1.google.oauth2('v2').userinfo;
        this.oauthClient.setCredentials({
            access_token: token,
        });
        const userInfoResponse = await userInfoClient.get({
            auth: this.oauthClient,
        });
        return userInfoResponse.data;
    }
    async registerUserGoogle(token) {
        try {
            const userData = await this.getUserDataGoogle(token);
            const tempUser = {
                name: userData.name,
                email: userData.email,
                username: userData.email,
                googleId: userData.id,
                facebookId: '',
                sex: userData.gender || 'other',
                avatar: userData.picture,
                address: '',
                role: 'user',
            };
            const newUser = await this.userModel.create(tempUser);
            return this.handleRegisteredUser(newUser);
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error);
        }
    }
    async handleRegisteredUser(user) {
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        const payload = {
            role: user.role,
            sub: user._id,
        };
        return {
            code: 200,
            user: user,
            message: 'success',
            access_token: this.jwtService.sign(payload),
        };
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map