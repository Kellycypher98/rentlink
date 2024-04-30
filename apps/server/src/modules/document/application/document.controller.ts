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
import { Document, DocumentDomainFacade } from '@server/modules/document/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { DocumentApplicationEvent } from './document.application.event'
import { DocumentCreateDto, DocumentUpdateDto } from './document.dto'

@Controller('/v1/documents')
export class DocumentController {
  constructor(
    private eventService: EventService,
    private documentDomainFacade: DocumentDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.documentDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: DocumentCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.documentDomainFacade.create(body)

    await this.eventService.emit<DocumentApplicationEvent.DocumentCreated.Payload>(
      DocumentApplicationEvent.DocumentCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:documentId')
  async findOne(
    @Param('documentId') documentId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.documentDomainFacade.findOneByIdOrFail(
      documentId,
      queryOptions,
    )

    return item
  }

  @Patch('/:documentId')
  async update(
    @Param('documentId') documentId: string,
    @Body() body: DocumentUpdateDto,
  ) {
    const item = await this.documentDomainFacade.findOneByIdOrFail(documentId)

    const itemUpdated = await this.documentDomainFacade.update(
      item,
      body as Partial<Document>,
    )
    return itemUpdated
  }

  @Delete('/:documentId')
  async delete(@Param('documentId') documentId: string) {
    const item = await this.documentDomainFacade.findOneByIdOrFail(documentId)

    await this.documentDomainFacade.delete(item)

    return item
  }
}
