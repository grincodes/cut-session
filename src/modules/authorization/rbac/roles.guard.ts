import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ACCESS_TYPE } from 'src/modules/authentication/constants';

import { ROLE_KEY } from './roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<ACCESS_TYPE>(
      ROLE_KEY,
      [context.getClass(), context.getHandler()],
    );

    if (!requiredRole) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    return user.accessType == requiredRole;
  }
}

// inject reflector when you want to get savemetadat from decorator
