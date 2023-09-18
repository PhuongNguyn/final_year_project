import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { IUserService } from './types/IAuthService';

@Injectable()
export class AuthService {
  private userService: IUserService;

  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}
  onModuleInit() {
    this.userService = this.client.getService('UserService');
  }
  async checkAuth(token: string) {
    return this.userService
      .CheckAuth({
        token,
      })
      .toPromise();
  }
}
