import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { DocumentDomainFacade } from '@server/modules/document/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { DocumentApplicationEvent } from './document.application.event'
import { DocumentCreateDto } from './document.dto'

import { TenantDomainFacade } from '../../tenant/domain'

@Controller('/v1/tenants')
export class DocumentByTenantController {
  constructor(
    private tenantDomainFacade: TenantDomainFacade,

    private documentDomainFacade: DocumentDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/tenant/:tenantId/documents')
  async findManyTenantId(
    @Param('tenantId') tenantId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.tenantDomainFacade.findOneByIdOrFail(tenantId)

    const items = await this.documentDomainFacade.findManyByTenant(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/tenant/:tenantId/documents')
  async createByTenantId(
    @Param('tenantId') tenantId: string,
    @Body() body: DocumentCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, tenantId }

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
