import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { LeaseDomainFacade } from '@server/modules/lease/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { LeaseApplicationEvent } from './lease.application.event'
import { LeaseCreateDto } from './lease.dto'

import { TenantDomainFacade } from '../../tenant/domain'

@Controller('/v1/tenants')
export class LeaseByTenantController {
  constructor(
    private tenantDomainFacade: TenantDomainFacade,

    private leaseDomainFacade: LeaseDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/tenant/:tenantId/leases')
  async findManyTenantId(
    @Param('tenantId') tenantId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.tenantDomainFacade.findOneByIdOrFail(tenantId)

    const items = await this.leaseDomainFacade.findManyByTenant(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/tenant/:tenantId/leases')
  async createByTenantId(
    @Param('tenantId') tenantId: string,
    @Body() body: LeaseCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, tenantId }

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
