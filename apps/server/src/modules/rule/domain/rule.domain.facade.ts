import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Rule } from './rule.model'

import { Property } from '../../property/domain'

@Injectable()
export class RuleDomainFacade {
  constructor(
    @InjectRepository(Rule)
    private repository: Repository<Rule>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Rule>): Promise<Rule> {
    return this.repository.save(values)
  }

  async update(item: Rule, values: Partial<Rule>): Promise<Rule> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Rule): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Rule> = {},
  ): Promise<Rule[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Rule> = {},
  ): Promise<Rule> {
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
    queryOptions: RequestHelper.QueryOptions<Rule> = {},
  ): Promise<Rule[]> {
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
