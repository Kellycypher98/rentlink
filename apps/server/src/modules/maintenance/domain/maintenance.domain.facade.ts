import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Maintenance } from './maintenance.model'

import { Property } from '../../property/domain'

@Injectable()
export class MaintenanceDomainFacade {
  constructor(
    @InjectRepository(Maintenance)
    private repository: Repository<Maintenance>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Maintenance>): Promise<Maintenance> {
    return this.repository.save(values)
  }

  async update(
    item: Maintenance,
    values: Partial<Maintenance>,
  ): Promise<Maintenance> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Maintenance): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Maintenance> = {},
  ): Promise<Maintenance[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Maintenance> = {},
  ): Promise<Maintenance> {
    if (!id) {
      this.databaseHelper.invalidQueryWhere('id')
    }

    const queryOptionsEnsured = {
      includes: queryOptions?.includes,
      filters: {
        id: id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    const item = await query.getOne()

    if (!item) {
      this.databaseHelper.notFoundByQuery(queryOptionsEnsured.filters)
    }

    return item
  }

  async findManyByProperty(
    item: Property,
    queryOptions: RequestHelper.QueryOptions<Maintenance> = {},
  ): Promise<Maintenance[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('property')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        propertyId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
