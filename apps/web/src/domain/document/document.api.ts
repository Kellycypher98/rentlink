import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Document } from './document.model'

export class DocumentApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Document>,
  ): Promise<Document[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/documents${buildOptions}`)
  }

  static findOne(
    documentId: string,
    queryOptions?: ApiHelper.QueryOptions<Document>,
  ): Promise<Document> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/documents/${documentId}${buildOptions}`)
  }

  static createOne(values: Partial<Document>): Promise<Document> {
    return HttpService.api.post(`/v1/documents`, values)
  }

  static updateOne(
    documentId: string,
    values: Partial<Document>,
  ): Promise<Document> {
    return HttpService.api.patch(`/v1/documents/${documentId}`, values)
  }

  static deleteOne(documentId: string): Promise<void> {
    return HttpService.api.delete(`/v1/documents/${documentId}`)
  }

  static findManyByPropertyId(
    propertyId: string,
    queryOptions?: ApiHelper.QueryOptions<Document>,
  ): Promise<Document[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/propertys/property/${propertyId}/documents${buildOptions}`,
    )
  }

  static createOneByPropertyId(
    propertyId: string,
    values: Partial<Document>,
  ): Promise<Document> {
    return HttpService.api.post(
      `/v1/propertys/property/${propertyId}/documents`,
      values,
    )
  }

  static findManyByTenantId(
    tenantId: string,
    queryOptions?: ApiHelper.QueryOptions<Document>,
  ): Promise<Document[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/tenants/tenant/${tenantId}/documents${buildOptions}`,
    )
  }

  static createOneByTenantId(
    tenantId: string,
    values: Partial<Document>,
  ): Promise<Document> {
    return HttpService.api.post(
      `/v1/tenants/tenant/${tenantId}/documents`,
      values,
    )
  }
}
