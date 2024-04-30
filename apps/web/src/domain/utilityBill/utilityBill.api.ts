import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { UtilityBill } from './utilityBill.model'

export class UtilityBillApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<UtilityBill>,
  ): Promise<UtilityBill[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/utilityBills${buildOptions}`)
  }

  static findOne(
    utilityBillId: string,
    queryOptions?: ApiHelper.QueryOptions<UtilityBill>,
  ): Promise<UtilityBill> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/utilityBills/${utilityBillId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<UtilityBill>): Promise<UtilityBill> {
    return HttpService.api.post(`/v1/utilityBills`, values)
  }

  static updateOne(
    utilityBillId: string,
    values: Partial<UtilityBill>,
  ): Promise<UtilityBill> {
    return HttpService.api.patch(`/v1/utilityBills/${utilityBillId}`, values)
  }

  static deleteOne(utilityBillId: string): Promise<void> {
    return HttpService.api.delete(`/v1/utilityBills/${utilityBillId}`)
  }

  static findManyByPropertyId(
    propertyId: string,
    queryOptions?: ApiHelper.QueryOptions<UtilityBill>,
  ): Promise<UtilityBill[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/propertys/property/${propertyId}/utilityBills${buildOptions}`,
    )
  }

  static createOneByPropertyId(
    propertyId: string,
    values: Partial<UtilityBill>,
  ): Promise<UtilityBill> {
    return HttpService.api.post(
      `/v1/propertys/property/${propertyId}/utilityBills`,
      values,
    )
  }
}
