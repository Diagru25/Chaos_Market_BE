import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/modules/database/services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
        usernameField: 'email'
    });
  }

  async validate(username: string, password: string): Promise<any> {
    console.log(username, password);
    const result = await this.authService.validateUser(username, password);

    if (!result.isValidate) throw new UnauthorizedException();

    return result.user;
  }
}
