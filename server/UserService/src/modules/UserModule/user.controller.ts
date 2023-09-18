import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { appConfig } from 'src/config';
import { Authentication } from 'src/decorators/authentication.decorator';
import { IPaging } from 'src/interfaces';
import { RESPONSE_STATUS, Response } from 'src/utils/response';
import { CreateUserDTO } from './UserDTO/CreateUser.dto';
import { LoginDTO } from './UserDTO/Login.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { RegisterDTO } from './UserDTO/Register.dto';
import { UpdateUserDTO } from './UserDTO/UpdateUser.dto';
import { ResetPasswordDTO } from './UserDTO/ResetPasword.dto';
import { Authorization } from 'src/decorators/authorization.decorator';
import { actionEnum } from '../PermissionModule/permission.entity';

export type UserExcludePassword = Omit<UserEntity, 'password'>;
@Controller(`${appConfig.BASE_URL}/users`)
export class UserController {
  constructor(
    private userService: UserService,
    private readonly i18n: I18nService,
  ) { }

  @Get('/init-admin')
  async initAdmin() {
    try {
      const result = await this.userService.initAdmin();

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
  @Authorization('user', actionEnum.CREATE)
  async createUser(@Body() body: CreateUserDTO) {
    try {
      const result = await this.userService.createUser(body);
      return Response<UserExcludePassword>({
        statusCode: RESPONSE_STATUS.SUCCESS,
        message: this.i18n.t('response.SUCCESS_CREATED_USER'),
        result: result,
      });
    } catch (error) {
      throw error;
    }
  }
  @Put('reset-password/:id')
  @Authorization('user', actionEnum.UPDATE)
  async resetPassword(@Body() body: ResetPasswordDTO, @Param('id') id: number) {
    try {
      const result = await this.userService.resetPassword(id, body.password);
      return Response<UserExcludePassword>({
        statusCode: RESPONSE_STATUS.SUCCESS,
        message: this.i18n.t('response.SUCCESS_UPDATED_USER'),
        result: result,
      });
    } catch (error) {
      throw error;
    }
  }
  @Put(':id')
  @Authorization('user', actionEnum.UPDATE)
  async updateUser(@Body() body: UpdateUserDTO, @Param('id') id: number) {
    try {
      const result = await this.userService.updateUser(id, body);
      return Response<UserExcludePassword>({
        statusCode: RESPONSE_STATUS.SUCCESS,
        message: this.i18n.t('response.SUCCESS_UPDATED_USER'),
        result: result,
      });
    } catch (error) {
      throw error;
    }
  }
  @Delete(':id')
  @Authorization('user', actionEnum.DELETE)
  async deleteUser(@Param('id') id: number) {
    try {
      const result = await this.userService.deleteUser(id);
      return Response<UserExcludePassword>({
        statusCode: RESPONSE_STATUS.SUCCESS,
        message: this.i18n.t('response.SUCCESS_DELETED_USER'),
        result: result,
      });
    } catch (error) {
      throw error;
    }
  }
  @Post('/register')
  async signUp(@Body() body: RegisterDTO) {
    try {
      const result = await this.userService.register(body);
      return Response<UserExcludePassword>({
        statusCode: RESPONSE_STATUS.SUCCESS,
        message: this.i18n.t('response.SUCCESS_CREATED_USER'),
        result: result,
      });
    } catch (error) {
      throw error;
    }
  }

  @Post('/login')
  async login(@Body() body: LoginDTO) {
    try {
      const result = await this.userService.login(body);

      return Response({
        statusCode: RESPONSE_STATUS.SUCCESS,
        result,
        message: this.i18n.t('response.LOGIN_SUCCESS'),
      });
    } catch (error) {
      throw error;
    }
  }

  @Get('/get-paging')
  @Authorization('user', actionEnum.READ)
  async getPagingUser(@Query() query: IPaging & { search: string }) {
    try {
      const users = await this.userService.getPagingUser({
        pageSize: Number(query.pageSize || 10),
        pageIndex: Number(query.pageIndex || 1),
        search: query.search || '',
      });
      return Response({ statusCode: RESPONSE_STATUS.SUCCESS, result: users });
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @Authorization('user', actionEnum.READ)
  async getUserById(@Param('id') id: number) {
    try {
      const user = await this.userService.getUserById(id);

      return Response({
        statusCode: RESPONSE_STATUS.SUCCESS,
        result: user,
        message: this.i18n.t('response.GET_USER_SUCCESS'),
      });
    } catch (error) {
      throw error;
    }
  }
}
