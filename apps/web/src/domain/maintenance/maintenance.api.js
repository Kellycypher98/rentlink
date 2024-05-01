import { HttpService } from "../../core/http";
import { ApiHelper } from "../helpers/api.helper";
import { Maintenance } from "./maintenance.model";

export class MaintenanceApi {
  static findMany(queryOptions) {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
    return HttpService.api.get(`/v1/maintenances${buildOptions}`);
  }

  static findOne(maintenanceId, queryOptions) {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
    return HttpService.api.get(
      `/v1/maintenances/${maintenanceId}${buildOptions}`
    );
  }

  static createOne(values) {
    return HttpService.api.post(`/v1/maintenances`, values);
  }

  static updateOne(maintenanceId, values) {
    return HttpService.api.patch(`/v1/maintenances/${maintenanceId}`, values);
  }

  static deleteOne(maintenanceId) {
    return HttpService.api.delete(`/v1/maintenances/${maintenanceId}`);
  }

  static findManyByPropertyId(propertyId, queryOptions) {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
    return HttpService.api.get(
      `/v1/propertys/property/${propertyId}/maintenances${buildOptions}`
    );
  }

  static createOneByPropertyId(propertyId, values) {
    return HttpService.api.post(
      `/v1/propertys/property/${propertyId}/maintenances`,
      values
    );
  }
}
