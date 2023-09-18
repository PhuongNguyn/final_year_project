import { Injectable } from '@nestjs/common';
import { BaseEntity, Repository } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';

@Injectable()
export class BaseService<T extends BaseEntity> {
  constructor(protected readonly repository: Repository<T>) {}

  async getAll() {
    return await this.repository.find();
  }

  async getPaging() {}
}
