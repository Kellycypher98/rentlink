import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { UtilityBillDomainFacade } from '@server/modules/utilityBill/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { UtilityBillApplicationEvent } from './utilityBill.application.event'
import { UtilityBillCreateDto } from './utilityBill.dto'

import { PropertyDomainFacade } from '../../property/domain'

@Controller('/v1/propertys')
export class UtilityBillByPropertyController {
  constructor(
    private propertyDomainFacade: PropertyDomainFacade,

    private utilityBillDomainFacade: UtilityBillDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/property/:propertyId/utilityBills')
  async findManyPropertyId(
    @Param('propertyId') propertyId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.propertyDomainFacade.findOneByIdOrFail(propertyId)

    const items = await this.utilityBillDomainFacade.findManyByProperty(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/property/:propertyId/utilityBills')
  async createByPropertyId(
    @Param('propertyId') propertyId: string,
    @Body() body: UtilityBillCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, propertyId }

    const item = await this.utilityBillDomainFacade.create(valuesUpdated)

    await this.eventService.emit<UtilityBillApplicationEvent.UtilityBillCreated.Payload>(
      UtilityBillApplicationEvent.UtilityBillCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
