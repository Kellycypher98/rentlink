import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import { Property, PropertyDomainFacade } from '@server/modules/property/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { PropertyApplicationEvent } from './property.application.event'
import { PropertyCreateDto, PropertyUpdateDto } from './property.dto'

@Controller('/v1/propertys')
export class PropertyController {
  constructor(
    private eventService: EventService,
    private propertyDomainFacade: PropertyDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.propertyDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: PropertyCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.propertyDomainFacade.create(body)

    await this.eventService.emit<PropertyApplicationEvent.PropertyCreated.Payload>(
      PropertyApplicationEvent.PropertyCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:propertyId')
  async findOne(
    @Param('propertyId') propertyId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.propertyDomainFacade.findOneByIdOrFail(
      propertyId,
      queryOptions,
    )

    return item
  }

  @Patch('/:propertyId')
  async update(
    @Param('propertyId') propertyId: string,
    @Body() body: PropertyUpdateDto,
  ) {
    const item = await this.propertyDomainFacade.findOneByIdOrFail(propertyId)

    const itemUpdated = await this.propertyDomainFacade.update(
      item,
      body as Partial<Property>,
    )
    return itemUpdated
  }

  @Delete('/:propertyId')
  async delete(@Param('propertyId') propertyId: string) {
    const item = await this.propertyDomainFacade.findOneByIdOrFail(propertyId)

    await this.propertyDomainFacade.delete(item)

    return item
  }
}
