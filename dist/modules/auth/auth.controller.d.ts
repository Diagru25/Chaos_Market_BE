import { AuthService } from '../database/services/auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    googleAuthentication(body: any, req: any): Promise<any>;
    login(req: any): Promise<any>;
    checkSession(): Promise<{
        statusCode: number;
        message: string;
    }>;
}
