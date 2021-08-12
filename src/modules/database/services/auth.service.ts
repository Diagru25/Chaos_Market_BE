import { User, UserDocument } from '../schema/user.schema';
import { Model } from 'mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { google, Auth } from 'googleapis';
import keys from 'src/configs/keys';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    oauthClient: Auth.OAuth2Client;
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>,
        private readonly jwtService: JwtService,
    ) {
        this.oauthClient = new google.auth.OAuth2(
            keys.googleConst.clientID,
            keys.googleConst.clientSecret,
        );
    }

    async login(user: any): Promise<any> {
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

    // async googleLogin(user: any) {
    //     if (!user) {
    //         return 'No user from google';
    //     }

    //     const foundUser = await this.userModel
    //         .findOne({
    //             googleId: user.googleId,
    //         })
    //         .exec();

    //     if (!foundUser) {
    //         const tempUser: User = {
    //             name: user.firstName + user.lastName,
    //             googleId: user.google.Id,
    //             email: user.email,
    //             password: null,
    //             username: null,
    //             address: '',
    //             sex: null,
    //             facebookId: '',
    //             avatar: user.picture,
    //             role: 'user',
    //         };
    //         const newUser = await this.userModel.create(tempUser);

    //         return {
    //             code: 200,
    //             user: newUser,
    //             message: 'success',
    //             access_token: this.jwtService.sign({
    //                 role: newUser.role,
    //                 sub: newUser._id,
    //             }),
    //         };
    //     }

    //     return {
    //         code: 200,
    //         user: foundUser,
    //         message: 'success',
    //         access_token: this.jwtService.sign({
    //             role: foundUser.role,
    //             sub: foundUser._id,
    //         }),
    //     };
    // }

    async validateUser(username: string, password: string): Promise<any> {
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

    async authenticateGoogle(token: string): Promise<any> {
        const tokenInfo = await this.oauthClient.getTokenInfo(token);

        const email = tokenInfo.email;

        const user = await this.userModel.findOne({ email: email }).exec();

        if (user) {
            return this.handleRegisteredUser(user);
        }

        return this.registerUserGoogle(token);
    }

    async getUserDataGoogle(token: string) {
        const userInfoClient = google.oauth2('v2').userinfo;
        this.oauthClient.setCredentials({
            access_token: token,
        });

        const userInfoResponse = await userInfoClient.get({
            auth: this.oauthClient,
        });

        return userInfoResponse.data;
    }

    async registerUserGoogle(token: string) {
        try {
            const userData = await this.getUserDataGoogle(token);
            const tempUser: User = {
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
        } catch (error) {
            throw new UnauthorizedException(error);
        }
    }

    async handleRegisteredUser(user) {
        if (!user) {
            throw new UnauthorizedException();
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
}
