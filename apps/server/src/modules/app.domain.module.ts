import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from './authentication/domain'
import { AuthorizationDomainModule } from './authorization/domain'

import { UserDomainModule } from './user/domain'

import { NotificationDomainModule } from './notification/domain'

import { PropertyDomainModule } from './property/domain'

import { TenantDomainModule } from './tenant/domain'

import { LeaseDomainModule } from './lease/domain'

import { DocumentDomainModule } from './document/domain'

import { MaintenanceDomainModule } from './maintenance/domain'

import { PaymentDomainModule } from './payment/domain'

import { RuleDomainModule } from './rule/domain'

import { UtilityBillDomainModule } from './utilityBill/domain'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserDomainModule,
    NotificationDomainModule,

    PropertyDomainModule,

    TenantDomainModule,

    LeaseDomainModule,

    DocumentDomainModule,

    MaintenanceDomainModule,

    PaymentDomainModule,

    RuleDomainModule,

    UtilityBillDomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppDomainModule {}
