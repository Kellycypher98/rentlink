import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Property } from './property.model'

import { User } from '../../user/domain'

@Injectable()
export class PropertyDomainFacade {
  constructor(
    @InjectRepository(Property)
    private repository: Repository<Property>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Property>): Promise<Property> {
    return this.repository.save(values)
  }

  async update(item: Property, values: Partial<Property>): Promise<Property> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Property): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Property> = {},
  ): Promise<Property[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Property> = {},
  ): Promise<Property> {
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

  async findManyByLandlord(
    item: User,
    queryOptions: RequestHelper.QueryOptions<Property> = {},
  ): Promise<Property[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('landlord')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        landlordId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
