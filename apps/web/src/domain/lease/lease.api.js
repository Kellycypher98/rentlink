import { HttpService } from "../../core/http";
import { ApiHelper } from "../helpers/api.helper";

export class LeaseApi {
  static findMany(queryOptions) {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
    return HttpService.api.get(`/v1/leases${buildOptions}`);
  }

  static findOne(leaseId, queryOptions) {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
    return HttpService.api.get(`/v1/leases/${leaseId}${buildOptions}`);
  }

  static createOne(values) {
    return HttpService.api.post(`/v1/leases`, values);
  }

  static updateOne(leaseId, values) {
    return HttpService.api.patch(`/v1/leases/${leaseId}`, values);
  }

  static deleteOne(leaseId) {
    return HttpService.api.delete(`/v1/leases/${leaseId}`);
  }

  static findManyByPropertyId(propertyId, queryOptions) {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
    return HttpService.api.get(
      `/v1/propertys/property/${propertyId}/leases${buildOptions}`
    );
  }

  static createOneByPropertyId(propertyId, values) {
    return HttpService.api.post(
      `/v1/propertys/property/${propertyId}/leases`,
      values
    );
  }

  static findManyByTenantId(tenantId, queryOptions) {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
    return HttpService.api.get(
      `/v1/tenants/tenant/${tenantId}/leases${buildOptions}`
    );
  }

  static createOneByTenantId(tenantId, values) {
    return HttpService.api.post(
      `/v1/tenants/tenant/${tenantId}/leases`,
      values
    );
  }
}
