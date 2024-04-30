import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { DocumentDomainFacade } from '@server/modules/document/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { DocumentApplicationEvent } from './document.application.event'
import { DocumentCreateDto } from './document.dto'

import { PropertyDomainFacade } from '../../property/domain'

@Controller('/v1/propertys')
export class DocumentByPropertyController {
  constructor(
    private propertyDomainFacade: PropertyDomainFacade,

    private documentDomainFacade: DocumentDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/property/:propertyId/documents')
  async findManyPropertyId(
    @Param('propertyId') propertyId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.propertyDomainFacade.findOneByIdOrFail(propertyId)

    const items = await this.documentDomainFacade.findManyByProperty(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/property/:propertyId/documents')
  async createByPropertyId(
    @Param('propertyId') propertyId: string,
    @Body() body: DocumentCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, propertyId }

    const item = await this.documentDomainFacade.create(valuesUpdated)

    await this.eventService.emit<DocumentApplicationEvent.DocumentCreated.Payload>(
      DocumentApplicationEvent.DocumentCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
