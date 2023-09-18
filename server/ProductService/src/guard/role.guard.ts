import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
export enum actionEnum {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  MANAGE = 'manage',
}
export interface Permission {
  id: number;
  subject: string;
  action: actionEnum;
  role: Role[];
}
export interface Role {
  id: number;
  name: string;
  permission: Permission[];
}

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
      throw new ForbiddenException('Bạn không có quyền truy cập');
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
