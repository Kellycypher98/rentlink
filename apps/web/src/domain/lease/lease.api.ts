import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Lease } from './lease.model'

export class LeaseApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Lease>,
  ): Promise<Lease[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/leases${buildOptions}`)
  }

  static findOne(
    leaseId: string,
    queryOptions?: ApiHelper.QueryOptions<Lease>,
  ): Promise<Lease> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/leases/${leaseId}${buildOptions}`)
  }

  static createOne(values: Partial<Lease>): Promise<Lease> {
    return HttpService.api.post(`/v1/leases`, values)
  }

  static updateOne(leaseId: string, values: Partial<Lease>): Promise<Lease> {
    return HttpService.api.patch(`/v1/leases/${leaseId}`, values)
  }

  static deleteOne(leaseId: string): Promise<void> {
    return HttpService.api.delete(`/v1/leases/${leaseId}`)
  }

  static findManyByPropertyId(
    propertyId: string,
    queryOptions?: ApiHelper.QueryOptions<Lease>,
  ): Promise<Lease[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/propertys/property/${propertyId}/leases${buildOptions}`,
    )
  }

  static createOneByPropertyId(
    propertyId: string,
    values: Partial<Lease>,
  ): Promise<Lease> {
    return HttpService.api.post(
      `/v1/propertys/property/${propertyId}/leases`,
      values,
    )
  }

  static findManyByTenantId(
    tenantId: string,
    queryOptions?: ApiHelper.QueryOptions<Lease>,
  ): Promise<Lease[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/tenants/tenant/${tenantId}/leases${buildOptions}`,
    )
  }

  static createOneByTenantId(
    tenantId: string,
    values: Partial<Lease>,
  ): Promise<Lease> {
    return HttpService.api.post(`/v1/tenants/tenant/${tenantId}/leases`, values)
  }
}
