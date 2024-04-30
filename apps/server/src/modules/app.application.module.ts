import { Module } from '@nestjs/common'
import { AuthenticationApplicationModule } from './authentication/application'
import { AuthorizationApplicationModule } from './authorization/application'
import { UserApplicationModule } from './user/application'

import { PropertyApplicationModule } from './property/application'

import { TenantApplicationModule } from './tenant/application'

import { LeaseApplicationModule } from './lease/application'

import { DocumentApplicationModule } from './document/application'

import { MaintenanceApplicationModule } from './maintenance/application'

import { PaymentApplicationModule } from './payment/application'

import { RuleApplicationModule } from './rule/application'

import { UtilityBillApplicationModule } from './utilityBill/application'

import { AiApplicationModule } from './ai/application/ai.application.module'
import { NotificationApplicationModule } from './notification/application/notification.application.module'
import { UploadApplicationModule } from './upload/application/upload.application.module'

@Module({
  imports: [
    AuthenticationApplicationModule,
    UserApplicationModule,
    AuthorizationApplicationModule,
    NotificationApplicationModule,
    AiApplicationModule,
    UploadApplicationModule,

    PropertyApplicationModule,

    TenantApplicationModule,

    LeaseApplicationModule,

    DocumentApplicationModule,

    MaintenanceApplicationModule,

    PaymentApplicationModule,

    RuleApplicationModule,

    UtilityBillApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppApplicationModule {}
