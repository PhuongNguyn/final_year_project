import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { RolesGuard, actionEnum } from '../guard/role.guard';
import { AuthGuard } from 'src/guard/auth.guard';

export function Authorization(subject: string, action: actionEnum) {
  return applyDecorators(
    SetMetadata('subject', subject),
    SetMetadata('action', action),
    UseGuards(AuthGuard, RolesGuard),
  );
}
