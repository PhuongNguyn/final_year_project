import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';
import { RolesGuard } from 'src/guard/role.guard';
import { actionEnum } from 'src/modules/PermissionModule/permission.entity';

export function Authorization(subject: string, action: actionEnum) {
  return applyDecorators(
    SetMetadata('subject', subject),
    SetMetadata('action', action),
    UseGuards(AuthGuard, RolesGuard),
  );
}
