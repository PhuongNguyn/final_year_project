import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDTO } from './RoleDTO/CreateRole.dto';
import { BaseService } from '../BaseModule/base.service';
import { role } from 'src/constant/role';
import { PermissionService } from '../PermissionModule/permission.service';
import { actionEnum } from '../PermissionModule/permission.entity';
import { NotFoundException } from '@nestjs/common';
import { mapPermission } from 'src/utils/permission';

export class RoleService extends BaseService<Role> {
  constructor(
    @InjectRepository(Role) private readonly roleEntity: Repository<Role>,
    private readonly permissionService: PermissionService,
  ) {
    super(roleEntity);
  }

  async createRole({ name, permissions }: CreateRoleDTO) {
    try {
      const result = this.roleEntity.create({ name });
      const role = await this.roleEntity.save(result);

      for (const key of Object.keys(permissions)) {
        permissions[key].forEach(async (action: actionEnum) => {
          this.permissionService.addPermission({ action, key, role });
        });
      }
      return role;
    } catch (error) {
      throw error;
    }
  }
  async updateRole(id: number, { name, permissions }: CreateRoleDTO) {
    try {
      const result = await this.roleEntity.findOne({
        where: { id },
        relations: { permission: { role: true } },
      });
      if (!result) {
        throw new NotFoundException();
      }
      let permissionCurrent = [...result.permission];

      result.name = name;
      await result.save();

      for (const key of Object.keys(permissions)) {
        permissions[key].forEach(async (action: actionEnum) => {
          this.permissionService.addPermission({ action, key, role: result });
          permissionCurrent = permissionCurrent.filter(
            (p) => !(p.action === action && p.subject === key),
          );
        });
      }
      permissionCurrent.forEach(async (permission) => {
        permission.role = permission.role.filter(
          (role) => role.id !== result.id,
        );
        await permission.save();
      });

      return role;
    } catch (error) {
      throw error;
    }
  }

  async getRoleByName(name: string) {
    try {
      const role = await this.roleEntity.findOneBy({ name });

      return role;
    } catch (error) {
      throw error;
    }
  }
  async getRoleById(id: number) {
    try {
      const role = await this.roleEntity.findOneBy({ id });

      return role;
    } catch (error) {
      throw error;
    }
  }
  async getPermissionByRoleId(id: number) {
    try {
      const role = await this.roleEntity.findOne({
        where: { id },
        relations: { permission: true },
      });

      const permissionMap = mapPermission(role.permission);

      return { ...role, permission: permissionMap };
    } catch (error) {
      throw error;
    }
  }

  async deleteRole(id: number) {
    try {
      const role = await this.roleEntity.findOneBy({
        id,
      });

      if (!role) {
        throw new NotFoundException('Không tìm thấy quyền hạn');
      }

      await role.remove();
      return role;
    } catch (error) {
      throw error;
    }
  }

  async initRole() {
    try {
      const customer = this.roleEntity.create({ name: role.CUSTOMER });
      await this.roleEntity.save(customer);
      const admin = this.roleEntity.create({ name: role.ADMIN });
      const adminRole = await this.roleEntity.save(admin);
      await this.permissionService.addPermission({
        key: 'all',
        action: actionEnum.MANAGE,
        role: admin,
      });

      return {
        message: 'Success',
      };
    } catch (error) {
      throw error;
    }
  }
}
