import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { LeaseDomainFacade } from '@server/modules/lease/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { LeaseApplicationEvent } from './lease.application.event'
import { LeaseCreateDto } from './lease.dto'

import { PropertyDomainFacade } from '../../property/domain'

@Controller('/v1/propertys')
export class LeaseByPropertyController {
  constructor(
    private propertyDomainFacade: PropertyDomainFacade,

    private leaseDomainFacade: LeaseDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/property/:propertyId/leases')
  async findManyPropertyId(
    @Param('propertyId') propertyId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.propertyDomainFacade.findOneByIdOrFail(propertyId)

    const items = await this.leaseDomainFacade.findManyByProperty(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/property/:propertyId/leases')
  async createByPropertyId(
    @Param('propertyId') propertyId: string,
    @Body() body: LeaseCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, propertyId }

    const item = await this.leaseDomainFacade.create(valuesUpdated)

    await this.eventService.emit<LeaseApplicationEvent.LeaseCreated.Payload>(
      LeaseApplicationEvent.LeaseCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
