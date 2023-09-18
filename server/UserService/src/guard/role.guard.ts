import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  Permission,
  actionEnum,
  actionType,
} from 'src/modules/PermissionModule/permission.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const action = this.reflector.getAllAndOverride<actionEnum>('action', [
      context.getHandler(),
      context.getClass(),
    ]);
    const subject = this.reflector.getAllAndOverride<string>('subject', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!action || !subject) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    if (!user.permission || !user.permission.length) {
      throw new UnauthorizedException();
    }

    let flag = false;

    user.permission?.forEach((item: Permission) => {
      if (item.action === actionEnum.MANAGE && item.subject == 'all') {
        flag = true;
      }

      if (item.action === actionEnum.MANAGE && item.subject == subject) {
        flag = true;
      }

      if (item.action === action && item.subject == subject) {
        flag = true;
      }
    });

    if (!flag) {
      throw new ForbiddenException('Bạn không có quyền truy cập');
    }

    return flag;
  }
}
