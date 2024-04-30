import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { RuleDomainFacade } from '@server/modules/rule/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RuleApplicationEvent } from './rule.application.event'
import { RuleCreateDto } from './rule.dto'

import { PropertyDomainFacade } from '../../property/domain'

@Controller('/v1/propertys')
export class RuleByPropertyController {
  constructor(
    private propertyDomainFacade: PropertyDomainFacade,

    private ruleDomainFacade: RuleDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/property/:propertyId/rules')
  async findManyPropertyId(
    @Param('propertyId') propertyId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.propertyDomainFacade.findOneByIdOrFail(propertyId)

    const items = await this.ruleDomainFacade.findManyByProperty(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/property/:propertyId/rules')
  async createByPropertyId(
    @Param('propertyId') propertyId: string,
    @Body() body: RuleCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, propertyId }

    const item = await this.ruleDomainFacade.create(valuesUpdated)

    await this.eventService.emit<RuleApplicationEvent.RuleCreated.Payload>(
      RuleApplicationEvent.RuleCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
