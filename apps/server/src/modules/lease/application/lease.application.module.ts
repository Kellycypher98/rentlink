import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { LeaseDomainModule } from '../domain'
import { LeaseController } from './lease.controller'

import { PropertyDomainModule } from '../../../modules/property/domain'

import { LeaseByPropertyController } from './leaseByProperty.controller'

import { TenantDomainModule } from '../../../modules/tenant/domain'

import { LeaseByTenantController } from './leaseByTenant.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    LeaseDomainModule,

    PropertyDomainModule,

    TenantDomainModule,
  ],
  controllers: [
    LeaseController,

    LeaseByPropertyController,

    LeaseByTenantController,
  ],
  providers: [],
})
export class LeaseApplicationModule {}
