import { HttpService } from "../../core/http";
import { ApiHelper } from "../helpers/api.helper";
import { Property } from "./property.model";

export class PropertyApi {
  static findMany(queryOptions) {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
    return HttpService.api.get(`/v1/properties${buildOptions}`);
  }

  static findOne(propertyId, queryOptions) {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
    return HttpService.api.get(`/v1/properties/${propertyId}${buildOptions}`);
  }

  static createOne(values) {
    return HttpService.api.post(`/v1/properties`, values);
  }

  static updateOne(propertyId, values) {
    return HttpService.api.patch(`/v1/properties/${propertyId}`, values);
  }

  static deleteOne(propertyId) {
    return HttpService.api.delete(`/v1/properties/${propertyId}`);
  }

  static findManyByLandlordId(landlordId, queryOptions) {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
    return HttpService.api.get(
      `/v1/users/landlord/${landlordId}/properties${buildOptions}`
    );
  }

  static createOneByLandlordId(landlordId, values) {
    return HttpService.api.post(
      `/v1/users/landlord/${landlordId}/properties`,
      values
    );
  }
}
