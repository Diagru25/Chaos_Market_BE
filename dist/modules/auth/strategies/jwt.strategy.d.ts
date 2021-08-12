import { Strategy } from 'passport-jwt';
declare const JwtAuthStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtAuthStrategy extends JwtAuthStrategy_base {
    constructor();
    validate(payload: any): Promise<{
        id: any;
        username: any;
        role: any;
    }>;
}
export {};
