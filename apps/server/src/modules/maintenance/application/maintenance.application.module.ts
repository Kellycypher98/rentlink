import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { MaintenanceDomainModule } from '../domain'
import { MaintenanceController } from './maintenance.controller'

import { PropertyDomainModule } from '../../../modules/property/domain'

import { MaintenanceByPropertyController } from './maintenanceByProperty.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    MaintenanceDomainModule,

    PropertyDomainModule,
  ],
  controllers: [MaintenanceController, MaintenanceByPropertyController],
  providers: [],
})
export class MaintenanceApplicationModule {}
