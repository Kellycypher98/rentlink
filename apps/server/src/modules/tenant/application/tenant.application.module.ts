import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { TenantDomainModule } from '../domain'
import { TenantController } from './tenant.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { TenantByUserController } from './tenantByUser.controller'

import { PropertyDomainModule } from '../../../modules/property/domain'

import { TenantByPropertyController } from './tenantByProperty.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    TenantDomainModule,

    UserDomainModule,

    PropertyDomainModule,
  ],
  controllers: [
    TenantController,

    TenantByUserController,

    TenantByPropertyController,
  ],
  providers: [],
})
export class TenantApplicationModule {}
