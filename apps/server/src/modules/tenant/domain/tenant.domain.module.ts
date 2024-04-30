import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { TenantDomainFacade } from './tenant.domain.facade'
import { Tenant } from './tenant.model'

@Module({
  imports: [TypeOrmModule.forFeature([Tenant]), DatabaseHelperModule],
  providers: [TenantDomainFacade, TenantDomainFacade],
  exports: [TenantDomainFacade],
})
export class TenantDomainModule {}
