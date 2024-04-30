import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { TenantDomainFacade } from '@server/modules/tenant/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { TenantApplicationEvent } from './tenant.application.event'
import { TenantCreateDto } from './tenant.dto'

import { PropertyDomainFacade } from '../../property/domain'

@Controller('/v1/propertys')
export class TenantByPropertyController {
  constructor(
    private propertyDomainFacade: PropertyDomainFacade,

    private tenantDomainFacade: TenantDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/property/:propertyId/tenants')
  async findManyPropertyId(
    @Param('propertyId') propertyId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.propertyDomainFacade.findOneByIdOrFail(propertyId)

    const items = await this.tenantDomainFacade.findManyByProperty(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/property/:propertyId/tenants')
  async createByPropertyId(
    @Param('propertyId') propertyId: string,
    @Body() body: TenantCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, propertyId }

    const item = await this.tenantDomainFacade.create(valuesUpdated)

    await this.eventService.emit<TenantApplicationEvent.TenantCreated.Payload>(
      TenantApplicationEvent.TenantCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
