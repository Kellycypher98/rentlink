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
import { Lease, LeaseDomainFacade } from '@server/modules/lease/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { LeaseApplicationEvent } from './lease.application.event'
import { LeaseCreateDto, LeaseUpdateDto } from './lease.dto'

@Controller('/v1/leases')
export class LeaseController {
  constructor(
    private eventService: EventService,
    private leaseDomainFacade: LeaseDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.leaseDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: LeaseCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.leaseDomainFacade.create(body)

    await this.eventService.emit<LeaseApplicationEvent.LeaseCreated.Payload>(
      LeaseApplicationEvent.LeaseCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:leaseId')
  async findOne(@Param('leaseId') leaseId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.leaseDomainFacade.findOneByIdOrFail(
      leaseId,
      queryOptions,
    )

    return item
  }

  @Patch('/:leaseId')
  async update(
    @Param('leaseId') leaseId: string,
    @Body() body: LeaseUpdateDto,
  ) {
    const item = await this.leaseDomainFacade.findOneByIdOrFail(leaseId)

    const itemUpdated = await this.leaseDomainFacade.update(
      item,
      body as Partial<Lease>,
    )
    return itemUpdated
  }

  @Delete('/:leaseId')
  async delete(@Param('leaseId') leaseId: string) {
    const item = await this.leaseDomainFacade.findOneByIdOrFail(leaseId)

    await this.leaseDomainFacade.delete(item)

    return item
  }
}
