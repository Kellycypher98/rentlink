import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Payment } from './payment.model'

export class PaymentApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Payment>,
  ): Promise<Payment[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/payments${buildOptions}`)
  }

  static findOne(
    paymentId: string,
    queryOptions?: ApiHelper.QueryOptions<Payment>,
  ): Promise<Payment> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/payments/${paymentId}${buildOptions}`)
  }

  static createOne(values: Partial<Payment>): Promise<Payment> {
    return HttpService.api.post(`/v1/payments`, values)
  }

  static updateOne(
    paymentId: string,
    values: Partial<Payment>,
  ): Promise<Payment> {
    return HttpService.api.patch(`/v1/payments/${paymentId}`, values)
  }

  static deleteOne(paymentId: string): Promise<void> {
    return HttpService.api.delete(`/v1/payments/${paymentId}`)
  }

  static findManyByLeaseId(
    leaseId: string,
    queryOptions?: ApiHelper.QueryOptions<Payment>,
  ): Promise<Payment[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/leases/lease/${leaseId}/payments${buildOptions}`,
    )
  }

  static createOneByLeaseId(
    leaseId: string,
    values: Partial<Payment>,
  ): Promise<Payment> {
    return HttpService.api.post(`/v1/leases/lease/${leaseId}/payments`, values)
  }
}
