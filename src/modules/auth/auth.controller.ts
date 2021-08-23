import {
    Controller,
    Get,
    HttpCode,
    Post,
    Req,
    Res,
    UseGuards,
    Body,
    HttpStatus
} from '@nestjs/common';
import apiResponse from 'src/helpers/api-response';
import { AuthService } from '../database/services/auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
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

    @Get('/check-session')
    async checkSession(@Req() req): Promise<any>{
        try {
            const authHeaders = req.headers['authorization'];

            if (authHeaders) {
                const token = authHeaders;
                return this.authService.checkSession(token);
            } else {
                return apiResponse(
                    HttpStatus.UNAUTHORIZED,
                    false,
                    '',
                    'no authorization headers',
                );
            }
        } catch (error) {
            return apiResponse(
                HttpStatus.UNAUTHORIZED,
                {},
                '',
                error,
            );
        }
    }
}
