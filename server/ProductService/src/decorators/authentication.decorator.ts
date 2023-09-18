import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';

export function Authentication() {
  return applyDecorators(UseGuards(AuthGuard));
}
