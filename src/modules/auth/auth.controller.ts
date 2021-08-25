import {
    Controller,
    Get,
    Post,
    Req,
    Res,
    UseGuards,
    Body,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import apiResponse from 'src/helpers/api-response';
import { AuthService } from '../database/services/auth.service';
import { UsersService } from '../database/services/users.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    @Post('/google-authentication')
    async googleAuthentication(@Body() body, @Res() res: Response) {
        try {
            const access_token = await this.authService.authenticateGoogle(
                body.googleToken,
            );

            return apiResponse(res, HttpStatus.OK, { access_token }, 'success');
        } catch (error) {
            return apiResponse(res, HttpStatus.UNAUTHORIZED, {}, error);
        }
    }

    // @UseGuards(googleAuthGuard)
    // @Get('/login/google')
    // async googleLogin(@Req() req) {}

    // @UseGuards(googleAuthGuard)
    // @Get('/login/google/redirect')
    // googleLoginRedirect(@Req() req) {
    //     return this.authService.googleLogin(req.user);
    // }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Req() req, @Res() res: Response) {
        try {
            const access_token = await this.authService.login(req.user);
            return apiResponse(res, HttpStatus.OK, {access_token}, 'success');
        } catch (error) {
            return apiResponse(res, HttpStatus.UNAUTHORIZED, {}, error);
        }
    }

    @Get('/check-session')
    async checkSession(@Req() req, @Res() res: Response): Promise<any> {
        try {
            const authHeaders = req.headers['authorization'];

            if (authHeaders) {
                const token = authHeaders;
                const realToken = token.replace('Bearer', '').trim();

                const decode = this.jwtService.verify(realToken);
                const user = this.usersService.findOne(decode._id);

                if (!user)
                    return apiResponse(
                        res,
                        HttpStatus.UNAUTHORIZED,
                        false,
                        'unauthorized',
                    );
                return apiResponse(res, HttpStatus.OK, true, 'success');
                
            } else {
                return apiResponse(
                    res,
                    HttpStatus.UNAUTHORIZED,
                    false,
                    'unauthorized',
                );
            }
        } catch (error) {
            return apiResponse(
                res,
                HttpStatus.UNAUTHORIZED,
                {},
                'unauthorized',
            );
        }
    }
}
