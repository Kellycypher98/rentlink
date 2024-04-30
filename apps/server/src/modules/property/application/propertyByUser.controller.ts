import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { PropertyDomainFacade } from '@server/modules/property/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { PropertyApplicationEvent } from './property.application.event'
import { PropertyCreateDto } from './property.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class PropertyByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private propertyDomainFacade: PropertyDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/landlord/:landlordId/propertys')
  async findManyLandlordId(
    @Param('landlordId') landlordId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(landlordId)

    const items = await this.propertyDomainFacade.findManyByLandlord(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/landlord/:landlordId/propertys')
  async createByLandlordId(
    @Param('landlordId') landlordId: string,
    @Body() body: PropertyCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, landlordId }

    const item = await this.propertyDomainFacade.create(valuesUpdated)

    await this.eventService.emit<PropertyApplicationEvent.PropertyCreated.Payload>(
      PropertyApplicationEvent.PropertyCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
