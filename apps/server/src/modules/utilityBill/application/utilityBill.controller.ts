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
import {
  UtilityBill,
  UtilityBillDomainFacade,
} from '@server/modules/utilityBill/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { UtilityBillApplicationEvent } from './utilityBill.application.event'
import { UtilityBillCreateDto, UtilityBillUpdateDto } from './utilityBill.dto'

@Controller('/v1/utilityBills')
export class UtilityBillController {
  constructor(
    private eventService: EventService,
    private utilityBillDomainFacade: UtilityBillDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.utilityBillDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: UtilityBillCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.utilityBillDomainFacade.create(body)

    await this.eventService.emit<UtilityBillApplicationEvent.UtilityBillCreated.Payload>(
      UtilityBillApplicationEvent.UtilityBillCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:utilityBillId')
  async findOne(
    @Param('utilityBillId') utilityBillId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.utilityBillDomainFacade.findOneByIdOrFail(
      utilityBillId,
      queryOptions,
    )

    return item
  }

  @Patch('/:utilityBillId')
  async update(
    @Param('utilityBillId') utilityBillId: string,
    @Body() body: UtilityBillUpdateDto,
  ) {
    const item =
      await this.utilityBillDomainFacade.findOneByIdOrFail(utilityBillId)

    const itemUpdated = await this.utilityBillDomainFacade.update(
      item,
      body as Partial<UtilityBill>,
    )
    return itemUpdated
  }

  @Delete('/:utilityBillId')
  async delete(@Param('utilityBillId') utilityBillId: string) {
    const item =
      await this.utilityBillDomainFacade.findOneByIdOrFail(utilityBillId)

    await this.utilityBillDomainFacade.delete(item)

    return item
  }
}
