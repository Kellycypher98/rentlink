import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Tenant } from './tenant.model'

export class TenantApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Tenant>,
  ): Promise<Tenant[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/tenants${buildOptions}`)
  }

  static findOne(
    tenantId: string,
    queryOptions?: ApiHelper.QueryOptions<Tenant>,
  ): Promise<Tenant> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/tenants/${tenantId}${buildOptions}`)
  }

  static createOne(values: Partial<Tenant>): Promise<Tenant> {
    return HttpService.api.post(`/v1/tenants`, values)
  }

  static updateOne(tenantId: string, values: Partial<Tenant>): Promise<Tenant> {
    return HttpService.api.patch(`/v1/tenants/${tenantId}`, values)
  }

  static deleteOne(tenantId: string): Promise<void> {
    return HttpService.api.delete(`/v1/tenants/${tenantId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Tenant>,
  ): Promise<Tenant[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/tenants${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Tenant>,
  ): Promise<Tenant> {
    return HttpService.api.post(`/v1/users/user/${userId}/tenants`, values)
  }

  static findManyByPropertyId(
    propertyId: string,
    queryOptions?: ApiHelper.QueryOptions<Tenant>,
  ): Promise<Tenant[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/propertys/property/${propertyId}/tenants${buildOptions}`,
    )
  }

  static createOneByPropertyId(
    propertyId: string,
    values: Partial<Tenant>,
  ): Promise<Tenant> {
    return HttpService.api.post(
      `/v1/propertys/property/${propertyId}/tenants`,
      values,
    )
  }
}
