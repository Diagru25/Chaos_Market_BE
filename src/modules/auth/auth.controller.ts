
import { Controller, Get, HttpCode, Post, Req, UseGuards, Body} from '@nestjs/common';
import { AuthService } from '../database/services/auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
//import { googleAuthGuard } from './guards/google-auth.guard';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/google-authentication')
    async googleAuthentication(@Body() body, @Req() req) {
        return this.authService.authenticateGoogle(body.googleToken);
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
    async login(@Req() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/check-session')
    @HttpCode(200)
    async checkSession() {
        return {
            statusCode: 200,
            message: 'alive',
        };
    }
}
