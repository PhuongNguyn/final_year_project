import { Module, forwardRef } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role } from './role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionModule } from '../PermissionModule/permission.module';
import { UserModule } from '../UserModule/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
    PermissionModule,
    forwardRef(() => UserModule),
  ],
  exports: [RoleService],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
