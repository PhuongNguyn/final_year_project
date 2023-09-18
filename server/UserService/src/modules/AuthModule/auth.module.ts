import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../UserModule/user.module';
import { PermissionModule } from '../PermissionModule/permission.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UserModule, PermissionModule, JwtModule],
})
export class AuthModule {}
