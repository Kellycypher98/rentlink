import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { MaintenanceDomainFacade } from './maintenance.domain.facade'
import { Maintenance } from './maintenance.model'

@Module({
  imports: [TypeOrmModule.forFeature([Maintenance]), DatabaseHelperModule],
  providers: [MaintenanceDomainFacade, MaintenanceDomainFacade],
  exports: [MaintenanceDomainFacade],
})
export class MaintenanceDomainModule {}
