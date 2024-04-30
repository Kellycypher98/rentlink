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
import { Tenant, TenantDomainFacade } from '@server/modules/tenant/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { TenantApplicationEvent } from './tenant.application.event'
import { TenantCreateDto, TenantUpdateDto } from './tenant.dto'

@Controller('/v1/tenants')
export class TenantController {
  constructor(
    private eventService: EventService,
    private tenantDomainFacade: TenantDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.tenantDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: TenantCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.tenantDomainFacade.create(body)

    await this.eventService.emit<TenantApplicationEvent.TenantCreated.Payload>(
      TenantApplicationEvent.TenantCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:tenantId')
  async findOne(@Param('tenantId') tenantId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.tenantDomainFacade.findOneByIdOrFail(
      tenantId,
      queryOptions,
    )

    return item
  }

  @Patch('/:tenantId')
  async update(
    @Param('tenantId') tenantId: string,
    @Body() body: TenantUpdateDto,
  ) {
    const item = await this.tenantDomainFacade.findOneByIdOrFail(tenantId)

    const itemUpdated = await this.tenantDomainFacade.update(
      item,
      body as Partial<Tenant>,
    )
    return itemUpdated
  }

  @Delete('/:tenantId')
  async delete(@Param('tenantId') tenantId: string) {
    const item = await this.tenantDomainFacade.findOneByIdOrFail(tenantId)

    await this.tenantDomainFacade.delete(item)

    return item
  }
}
