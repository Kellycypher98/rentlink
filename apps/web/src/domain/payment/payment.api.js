import { HttpService } from "../../core/http";
import { ApiHelper } from "../helpers/api.helper";

export class PaymentApi {
  static findMany(queryOptions) {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
    return HttpService.api.get(`/v1/payments${buildOptions}`);
  }

  static findOne(paymentId, queryOptions) {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
    return HttpService.api.get(`/v1/payments/${paymentId}${buildOptions}`);
  }

  static createOne(values) {
    return HttpService.api.post(`/v1/payments`, values);
  }

  static updateOne(paymentId, values) {
    return HttpService.api.patch(`/v1/payments/${paymentId}`, values);
  }

  static deleteOne(paymentId) {
    return HttpService.api.delete(`/v1/payments/${paymentId}`);
  }

  static findManyByLeaseId(leaseId, queryOptions) {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
    return HttpService.api.get(
      `/v1/leases/lease/${leaseId}/payments${buildOptions}`
    );
  }

  static createOneByLeaseId(leaseId, values) {
    return HttpService.api.post(`/v1/leases/lease/${leaseId}/payments`, values);
  }
}
