import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { PaymentDomainFacade } from '@server/modules/payment/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { PaymentApplicationEvent } from './payment.application.event'
import { PaymentCreateDto } from './payment.dto'

import { LeaseDomainFacade } from '../../lease/domain'

@Controller('/v1/leases')
export class PaymentByLeaseController {
  constructor(
    private leaseDomainFacade: LeaseDomainFacade,

    private paymentDomainFacade: PaymentDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/lease/:leaseId/payments')
  async findManyLeaseId(
    @Param('leaseId') leaseId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.leaseDomainFacade.findOneByIdOrFail(leaseId)

    const items = await this.paymentDomainFacade.findManyByLease(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/lease/:leaseId/payments')
  async createByLeaseId(
    @Param('leaseId') leaseId: string,
    @Body() body: PaymentCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, leaseId }

    const item = await this.paymentDomainFacade.create(valuesUpdated)

    await this.eventService.emit<PaymentApplicationEvent.PaymentCreated.Payload>(
      PaymentApplicationEvent.PaymentCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
