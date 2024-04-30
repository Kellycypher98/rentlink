import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Rule } from './rule.model'

export class RuleApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Rule>,
  ): Promise<Rule[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/rules${buildOptions}`)
  }

  static findOne(
    ruleId: string,
    queryOptions?: ApiHelper.QueryOptions<Rule>,
  ): Promise<Rule> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/rules/${ruleId}${buildOptions}`)
  }

  static createOne(values: Partial<Rule>): Promise<Rule> {
    return HttpService.api.post(`/v1/rules`, values)
  }

  static updateOne(ruleId: string, values: Partial<Rule>): Promise<Rule> {
    return HttpService.api.patch(`/v1/rules/${ruleId}`, values)
  }

  static deleteOne(ruleId: string): Promise<void> {
    return HttpService.api.delete(`/v1/rules/${ruleId}`)
  }

  static findManyByPropertyId(
    propertyId: string,
    queryOptions?: ApiHelper.QueryOptions<Rule>,
  ): Promise<Rule[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/propertys/property/${propertyId}/rules${buildOptions}`,
    )
  }

  static createOneByPropertyId(
    propertyId: string,
    values: Partial<Rule>,
  ): Promise<Rule> {
    return HttpService.api.post(
      `/v1/propertys/property/${propertyId}/rules`,
      values,
    )
  }
}
