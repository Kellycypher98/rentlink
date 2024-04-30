import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Tenant } from './tenant.model'

import { User } from '../../user/domain'

import { Property } from '../../property/domain'

@Injectable()
export class TenantDomainFacade {
  constructor(
    @InjectRepository(Tenant)
    private repository: Repository<Tenant>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Tenant>): Promise<Tenant> {
    return this.repository.save(values)
  }

  async update(item: Tenant, values: Partial<Tenant>): Promise<Tenant> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Tenant): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Tenant> = {},
  ): Promise<Tenant[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Tenant> = {},
  ): Promise<Tenant> {
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

  async findManyByUser(
    item: User,
    queryOptions: RequestHelper.QueryOptions<Tenant> = {},
  ): Promise<Tenant[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('user')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        userId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByProperty(
    item: Property,
    queryOptions: RequestHelper.QueryOptions<Tenant> = {},
  ): Promise<Tenant[]> {
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
