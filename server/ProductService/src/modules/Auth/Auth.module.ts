import { Module } from '@nestjs/common';

import { AuthService } from './Auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'user-service:8101',
          package: 'user',
          protoPath: join(__dirname, '../../proto/user.proto'),
        },
      },
    ]),
  ],

  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
