import { HttpService } from "../../core/http";
import { ApiHelper } from "../helpers/api.helper";

export class DocumentApi {
  static findMany(queryOptions) {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
    return HttpService.api.get(`/v1/documents${buildOptions}`);
  }

  static findOne(documentId, queryOptions) {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
    return HttpService.api.get(`/v1/documents/${documentId}${buildOptions}`);
  }

  static createOne(values) {
    return HttpService.api.post(`/v1/documents`, values);
  }

  static updateOne(documentId, values) {
    return HttpService.api.patch(`/v1/documents/${documentId}`, values);
  }

  static deleteOne(documentId) {
    return HttpService.api.delete(`/v1/documents/${documentId}`);
  }

  static findManyByPropertyId(propertyId, queryOptions) {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
    return HttpService.api.get(
      `/v1/propertys/property/${propertyId}/documents${buildOptions}`
    );
  }

  static createOneByPropertyId(propertyId, values) {
    return HttpService.api.post(
      `/v1/propertys/property/${propertyId}/documents`,
      values
    );
  }

  static findManyByTenantId(tenantId, queryOptions) {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
    return HttpService.api.get(
      `/v1/tenants/tenant/${tenantId}/documents${buildOptions}`
    );
  }

  static createOneByTenantId(tenantId, values) {
    return HttpService.api.post(
      `/v1/tenants/tenant/${tenantId}/documents`,
      values
    );
  }
}
