import {
  Injectable,
  CanActivate,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/modules/database/services/users.service';
import { Role } from '../../../configs/roles.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const requiredRoles = this.reflector.get(ROLES_KEY, context.getHandler()) || [];

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const foundUser = await this.usersService.findOne(user.id);

    if(!foundUser)
        return false;
    else {
        return requiredRoles.some((role) => role === foundUser.role)
    }
  }
}
