import { UserDocument } from '../schema/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Auth } from 'googleapis';
export declare class AuthService {
    private readonly userModel;
    private readonly jwtService;
    oauthClient: Auth.OAuth2Client;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    login(user: any): Promise<any>;
    validateUser(username: string, password: string): Promise<any>;
    authenticateGoogle(token: string): Promise<any>;
    getUserDataGoogle(token: string): Promise<import("googleapis").oauth2_v2.Schema$Userinfo>;
    registerUserGoogle(token: string): Promise<{
        code: number;
        user: any;
        message: string;
        access_token: string;
    }>;
    handleRegisteredUser(user: any): Promise<{
        code: number;
        user: any;
        message: string;
        access_token: string;
    }>;
}
