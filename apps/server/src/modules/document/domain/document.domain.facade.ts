import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Document } from './document.model'

import { Property } from '../../property/domain'

import { Tenant } from '../../tenant/domain'

@Injectable()
export class DocumentDomainFacade {
  constructor(
    @InjectRepository(Document)
    private repository: Repository<Document>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Document>): Promise<Document> {
    return this.repository.save(values)
  }

  async update(item: Document, values: Partial<Document>): Promise<Document> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Document): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Document> = {},
  ): Promise<Document[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Document> = {},
  ): Promise<Document> {
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
    queryOptions: RequestHelper.QueryOptions<Document> = {},
  ): Promise<Document[]> {
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

  async findManyByTenant(
    item: Tenant,
    queryOptions: RequestHelper.QueryOptions<Document> = {},
  ): Promise<Document[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('tenant')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        tenantId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
