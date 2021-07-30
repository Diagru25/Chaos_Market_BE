
import { Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../database/services/auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('check-session')
    @HttpCode(200)
    async checkSession() {
        return {
            statusCode: 200,
            message: 'alive'
        };
    }
}
