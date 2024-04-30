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
import { Rule, RuleDomainFacade } from '@server/modules/rule/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { RuleApplicationEvent } from './rule.application.event'
import { RuleCreateDto, RuleUpdateDto } from './rule.dto'

@Controller('/v1/rules')
export class RuleController {
  constructor(
    private eventService: EventService,
    private ruleDomainFacade: RuleDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.ruleDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: RuleCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.ruleDomainFacade.create(body)

    await this.eventService.emit<RuleApplicationEvent.RuleCreated.Payload>(
      RuleApplicationEvent.RuleCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:ruleId')
  async findOne(@Param('ruleId') ruleId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.ruleDomainFacade.findOneByIdOrFail(
      ruleId,
      queryOptions,
    )

    return item
  }

  @Patch('/:ruleId')
  async update(@Param('ruleId') ruleId: string, @Body() body: RuleUpdateDto) {
    const item = await this.ruleDomainFacade.findOneByIdOrFail(ruleId)

    const itemUpdated = await this.ruleDomainFacade.update(
      item,
      body as Partial<Rule>,
    )
    return itemUpdated
  }

  @Delete('/:ruleId')
  async delete(@Param('ruleId') ruleId: string) {
    const item = await this.ruleDomainFacade.findOneByIdOrFail(ruleId)

    await this.ruleDomainFacade.delete(item)

    return item
  }
}
