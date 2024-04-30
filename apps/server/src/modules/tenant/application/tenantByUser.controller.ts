import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { TenantDomainFacade } from '@server/modules/tenant/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { TenantApplicationEvent } from './tenant.application.event'
import { TenantCreateDto } from './tenant.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class TenantByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private tenantDomainFacade: TenantDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/tenants')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.tenantDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/tenants')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: TenantCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.tenantDomainFacade.create(valuesUpdated)

    await this.eventService.emit<TenantApplicationEvent.TenantCreated.Payload>(
      TenantApplicationEvent.TenantCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
