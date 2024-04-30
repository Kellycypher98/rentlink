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
  Maintenance,
  MaintenanceDomainFacade,
} from '@server/modules/maintenance/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { MaintenanceApplicationEvent } from './maintenance.application.event'
import { MaintenanceCreateDto, MaintenanceUpdateDto } from './maintenance.dto'

@Controller('/v1/maintenances')
export class MaintenanceController {
  constructor(
    private eventService: EventService,
    private maintenanceDomainFacade: MaintenanceDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.maintenanceDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: MaintenanceCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.maintenanceDomainFacade.create(body)

    await this.eventService.emit<MaintenanceApplicationEvent.MaintenanceCreated.Payload>(
      MaintenanceApplicationEvent.MaintenanceCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:maintenanceId')
  async findOne(
    @Param('maintenanceId') maintenanceId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.maintenanceDomainFacade.findOneByIdOrFail(
      maintenanceId,
      queryOptions,
    )

    return item
  }

  @Patch('/:maintenanceId')
  async update(
    @Param('maintenanceId') maintenanceId: string,
    @Body() body: MaintenanceUpdateDto,
  ) {
    const item =
      await this.maintenanceDomainFacade.findOneByIdOrFail(maintenanceId)

    const itemUpdated = await this.maintenanceDomainFacade.update(
      item,
      body as Partial<Maintenance>,
    )
    return itemUpdated
  }

  @Delete('/:maintenanceId')
  async delete(@Param('maintenanceId') maintenanceId: string) {
    const item =
      await this.maintenanceDomainFacade.findOneByIdOrFail(maintenanceId)

    await this.maintenanceDomainFacade.delete(item)

    return item
  }
}
