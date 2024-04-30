import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { MaintenanceDomainFacade } from '@server/modules/maintenance/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { MaintenanceApplicationEvent } from './maintenance.application.event'
import { MaintenanceCreateDto } from './maintenance.dto'

import { PropertyDomainFacade } from '../../property/domain'

@Controller('/v1/propertys')
export class MaintenanceByPropertyController {
  constructor(
    private propertyDomainFacade: PropertyDomainFacade,

    private maintenanceDomainFacade: MaintenanceDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/property/:propertyId/maintenances')
  async findManyPropertyId(
    @Param('propertyId') propertyId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.propertyDomainFacade.findOneByIdOrFail(propertyId)

    const items = await this.maintenanceDomainFacade.findManyByProperty(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/property/:propertyId/maintenances')
  async createByPropertyId(
    @Param('propertyId') propertyId: string,
    @Body() body: MaintenanceCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, propertyId }

    const item = await this.maintenanceDomainFacade.create(valuesUpdated)

    await this.eventService.emit<MaintenanceApplicationEvent.MaintenanceCreated.Payload>(
      MaintenanceApplicationEvent.MaintenanceCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
