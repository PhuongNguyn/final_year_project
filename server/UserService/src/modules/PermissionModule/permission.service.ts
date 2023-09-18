import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission, actionEnum, actionType } from './permission.entity';
import { BaseService } from '../BaseModule/base.service';
import { Repository } from 'typeorm';
import { Role } from '../RoleModule/role.entity';

@Injectable()
export class PermissionService extends BaseService<Permission> {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionEntity: Repository<Permission>,
  ) {
    super(permissionEntity);
  }

  async addPermission({
    action,
    key,
    role,
  }: {
    action: actionEnum;
    key: string;
    role: Role;
  }) {
    try {
      const permission = await this.permissionEntity.findOneBy({
        subject: key,
        action: action,
        role: { id: role.id },
      });
      if (permission) {
        return permission;
      } else {
        const checkExitsPermission = await this.permissionEntity.findOne({
          where: {
            action: action,
            subject: key,
          },
          relations: { role: true },
        });
        if (checkExitsPermission) {
          checkExitsPermission.role = [
            ...(checkExitsPermission?.role || []),
            role,
          ];
          await checkExitsPermission.save();
          return checkExitsPermission;
        } else {
          const newPermission = this.permissionEntity.create({
            action,
            subject: key,
          });
          newPermission.role = [...(newPermission?.role || []), role];
          await newPermission.save();
          return newPermission;
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async getPermissionByRole(id: number) {
    try {
      const rolePermission = await this.permissionEntity.find({
        where: {
          role: {
            id,
          },
        },
      });

      return rolePermission;
    } catch (error) {
      throw error;
    }
  }
}
