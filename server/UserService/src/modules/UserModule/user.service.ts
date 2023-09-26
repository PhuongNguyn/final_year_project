import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, compareSync, hashSync } from 'bcryptjs';
import { I18nService } from 'nestjs-i18n';
import { role } from 'src/constant/role';
import { Not, Repository } from 'typeorm';
import { BaseService } from '../BaseModule/base.service';
import { PermissionService } from '../PermissionModule/permission.service';
import { RoleService } from '../RoleModule/role.service';
import { CreateUserDTO } from './UserDTO/CreateUser.dto';
import { LoginDTO } from './UserDTO/Login.dto';
import { UserEntity } from './user.entity';
import { RegisterDTO } from './UserDTO/Register.dto';
import { UpdateUserDTO } from './UserDTO/UpdateUser.dto';
import { mapPermission } from 'src/utils/permission';
@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(
    private readonly i18n: I18nService,
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => RoleService))
    private readonly roleServive: RoleService,
    private readonly permissionService: PermissionService,
  ) {
    super(userEntity);
  }

  async createUser(data: CreateUserDTO) {
    try {
      const hash = hashSync(data.password, 10);

      const checkUserPhoneNumber = await this.userEntity.findOneBy({
        phoneNumber: data.phoneNumber,
      });

      if (checkUserPhoneNumber) {
        throw new HttpException(
          this.i18n.t('response.PHONENUMBER_USED'),
          HttpStatus.BAD_REQUEST,
        );
      }

      const checkUserEmail = await this.userEntity.findOneBy({
        email: data.email,
      });

      if (checkUserEmail) {
        throw new HttpException(
          this.i18n.t('response.EMAIL_USED'),
          HttpStatus.BAD_REQUEST,
        );
      }
      const findCustomerRole = await this.roleServive.getRoleById(data.role);

      const dataToCreate = {
        ...data,
        password: hash,
        role: findCustomerRole,
      };
      const user = this.userEntity.create(dataToCreate);
      const returnUser = await this.userEntity.save(user, {
        reload: true,
      });

      delete returnUser.password;

      return returnUser;
    } catch (error) {
      throw error;
    }
  }
  async updateUser(id: number, data: UpdateUserDTO) {
    try {
      const checkUserPhoneNumber = await this.userEntity.findOneBy({
        phoneNumber: data.phoneNumber,
        id: Not(id),
      });

      if (checkUserPhoneNumber) {
        throw new HttpException(
          this.i18n.t('response.PHONENUMBER_USED'),
          HttpStatus.BAD_REQUEST,
        );
      }

      const checkUserEmail = await this.userEntity.findOneBy({
        email: data.email,
        id: Not(id),
      });

      if (checkUserEmail) {
        throw new HttpException(
          this.i18n.t('response.EMAIL_USED'),
          HttpStatus.BAD_REQUEST,
        );
      }
      const findCustomerRole = await this.roleServive.getRoleById(data.role);

      const updateData = {
        ...data,
        role: findCustomerRole,
      };
      const user = await this.userEntity.findOne({
        where: { id },
        relations: { role: true },
      });
      for (const key of Object.keys(updateData)) {
        user[key] = updateData[key];
      }

      await user.save();

      return user;
    } catch (error) {
      throw error;
    }
  }
  async resetPassword(id: number, password: string) {
    try {
      const hash = hashSync(password, 10);

      const user = await this.userEntity.findOne({
        where: { id },
      });
      user.password = hash;
      await user.save();

      return user;
    } catch (error) {
      throw error;
    }
  }
  async deleteUser(id: number) {
    try {
      const user = await this.userEntity.findOne({
        where: { id },
        relations: { role: true },
      });
      await user.remove();
      return user;
    } catch (error) {
      throw error;
    }
  }

  async register(data: RegisterDTO) {
    try {
      const hash = hashSync(data.password, 10);

      const checkUserPhoneNumber = await this.userEntity.findOneBy({
        phoneNumber: data.phoneNumber,
      });

      if (checkUserPhoneNumber) {
        throw new HttpException(
          this.i18n.t('response.PHONENUMBER_USED'),
          HttpStatus.BAD_REQUEST,
        );
      }


      const findCustomerRole = await this.roleServive.getRoleByName(
        role.CUSTOMER,
      );

      const dataToCreate = {
        ...data,
        password: hash,
        role: findCustomerRole,
      };
      const user = this.userEntity.create(dataToCreate);
      console.log(user)
      const returnUser = await this.userEntity.save(user, {
        reload: true,
      });

      delete returnUser.password;

      return returnUser;
    } catch (error) {
      throw error;
    }
  }

  async login(data: LoginDTO) {
    try {
      const result = await this.userEntity
        .createQueryBuilder()
        .where({ phoneNumber: data.phoneNumber })
        .addSelect(`${this.userEntity.metadata.name}.password`)
        .leftJoinAndSelect(`${this.userEntity.metadata.name}.role`, 'roles')
        .getOne();

      if (!result) {
        throw new HttpException(
          this.i18n.t('response.NOT_FOUND_USER'),
          HttpStatus.NOT_FOUND,
        );
      }

      const checkPassword = compareSync(data.password, result.password);

      if (!checkPassword) {
        throw new HttpException(
          this.i18n.t('response.WRONG_PASSWORD'),
          HttpStatus.UNAUTHORIZED,
        );
      }

      const permission = await this.permissionService.getPermissionByRole(
        result.role.id,
      );

      const accessToken = await this.jwtService.signAsync(
        {
          userId: result.id,
        },
        {
          expiresIn: '1d',
        },
      );
      delete result.password;
      return {
        user: result,
        accessToken,
        permission: mapPermission(permission),
      };
    } catch (error) {
      throw error;
    }
  }

  async initAdmin() {
    try {
      const findAdminRole = await this.roleServive.getRoleByName(role.ADMIN);

      const hash = hashSync('123123@', 10);
      const user = this.userEntity.create({
        fullname: 'Admin',
        role: findAdminRole,
        email: 'admin@gmail.com',
        phoneNumber: '0123456789',
        password: hash,
        address: '131, CN11',
        status: 1,
      });

      await this.userEntity.save(user);

      return true;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id?: number) {
    if (!id) {
      return null;
    }
    try {
      const user = await this.userEntity.findOne({
        where: { id },
        relations: ['role'],
      });

      const findPermission = await this.permissionService.getPermissionByRole(
        user.role.id,
      );

      return {
        ...user,

        permission: findPermission,
      };
    } catch (error) {
      throw error;
    }
  }

  async getPagingUser({
    pageSize,
    pageIndex,
    search,
  }: {
    pageSize: number;
    pageIndex: number;
    search: string;
  }) {
    try {
      let searchQuery = {};

      if (search) {
        searchQuery = {
          ...searchQuery,
          username: `%${search}%`,
        };
      }
      const users = await this.userEntity.find({
        where: searchQuery,
        skip: pageSize * pageIndex - pageSize,
        take: pageSize,
        relations: { role: true },
        order: {
          createdAt: 'DESC',
        },
      });
      const totalDocs = await this.userEntity.count();
      return {
        users,
        totalDoc: totalDocs,
        totalPage: Math.ceil(totalDocs / pageSize),
      };
    } catch (error) {
      throw error;
    }
  }
}
