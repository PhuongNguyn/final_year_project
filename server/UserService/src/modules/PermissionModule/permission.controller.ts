import { Controller } from '@nestjs/common';
import { appConfig } from 'src/config';
import { PermissionService } from './permission.service';

@Controller(`${appConfig.BASE_URL}/permissions`)
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}
}
