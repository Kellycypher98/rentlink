import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { UtilityBill } from './utilityBill.model'

import { Property } from '../../property/domain'

@Injectable()
export class UtilityBillDomainFacade {
  constructor(
    @InjectRepository(UtilityBill)
    private repository: Repository<UtilityBill>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<UtilityBill>): Promise<UtilityBill> {
    return this.repository.save(values)
  }

  async update(
    item: UtilityBill,
    values: Partial<UtilityBill>,
  ): Promise<UtilityBill> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: UtilityBill): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<UtilityBill> = {},
  ): Promise<UtilityBill[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<UtilityBill> = {},
  ): Promise<UtilityBill> {
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
    queryOptions: RequestHelper.QueryOptions<UtilityBill> = {},
  ): Promise<UtilityBill[]> {
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
