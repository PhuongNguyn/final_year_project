import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../UserModule/user.service';
import { Permission, actionEnum } from '../PermissionModule/permission.entity';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async checkAuth(token: string) {
    if (!token) {
      return { code: 16, message: { code: 16, message: 'UNAUTHENTICATED' } };
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET || 'test',
      });
      if (!payload.userId) {
        throw new RpcException({ code: 16, message: 'UNAUTHENTICATED' });
      }
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      const user = await this.userService.getUserById(payload.userId);

      if (!user) {
        throw new RpcException({ code: 16, message: 'UNAUTHENTICATED' });
      }

      return {
        code: 0,
        success: true,
        message: 'Xác thực thành công',
        user,
      };
    } catch (error) {
      throw new RpcException({
        code: 16,
        message: 'UNAUTHENTICATED',
        detail: error.message,
      });
    }
  }
}
