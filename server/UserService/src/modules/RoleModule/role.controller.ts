import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { appConfig } from 'src/config';
import { Authorization } from 'src/decorators/authorization.decorator';
import { RESPONSE_STATUS, Response } from 'src/utils/response';
import { actionEnum } from '../PermissionModule/permission.entity';
import { CreateRoleDTO } from './RoleDTO/CreateRole.dto';
import { RoleService } from './role.service';

@Controller(`${appConfig.BASE_URL}/roles`)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('/init-role')
  async initRole() {
    try {
      const result = await this.roleService.initRole();

      return Response({
        message: 'Success',
        statusCode: RESPONSE_STATUS.SUCCESS,
      });
    } catch (error) {
      throw error;
    }
  }
  @Get('/get-all')
  @Authorization('role', actionEnum.READ)
  async getAll() {
    try {
      const result = await this.roleService.getAll();

      return Response({
        message: 'Success',
        statusCode: RESPONSE_STATUS.SUCCESS,
        result,
      });
    } catch (error) {
      throw error;
    }
  }
  @Get('/permission/:id')
  @Authorization('role', actionEnum.READ)
  async getPermission(@Param('id') id: number) {
    try {
      const result = await this.roleService.getPermissionByRoleId(id);

      return Response({
        message: 'Success',
        statusCode: RESPONSE_STATUS.SUCCESS,
        result,
      });
    } catch (error) {
      throw error;
    }
  }

  @Post()
  @Authorization('role', actionEnum.CREATE)
  async createRole(@Body() body: CreateRoleDTO) {
    try {
      const result = await this.roleService.createRole(body);

      return Response({
        message: 'Success',
        statusCode: RESPONSE_STATUS.SUCCESS,
        result,
      });
    } catch (error) {
      throw error;
    }
  }
  @Put(':id')
  @Authorization('role', actionEnum.UPDATE)
  async updateRole(@Body() body: CreateRoleDTO, @Param('id') id: number) {
    try {
      const result = await this.roleService.updateRole(id, body);

      return Response({
        message: 'Success',
        statusCode: RESPONSE_STATUS.SUCCESS,
        result,
      });
    } catch (error) {
      throw error;
    }
  }
  @Delete(':id')
  @Authorization('role', actionEnum.DELETE)
  async deleteRole(@Param('id') id: number) {
    try {
      await this.roleService.deleteRole(id);

      return Response({
        message: 'Success',
        statusCode: RESPONSE_STATUS.SUCCESS,
      });
    } catch (error) {
      throw error;
    }
  }
}
