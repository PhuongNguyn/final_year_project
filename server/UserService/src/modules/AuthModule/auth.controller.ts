import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GrpcMethod } from '@nestjs/microservices';

interface CheckAuthMessage {
  token: string;
  subject: string;
  action: string;
}

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @GrpcMethod('UserService', 'CheckAuth')
  async checkAuth({ token }: CheckAuthMessage) {
    const res = await this.authService.checkAuth(token);
    return res;
  }
}
