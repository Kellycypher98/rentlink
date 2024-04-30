import { Module } from '@nestjs/common'
import { SocketModule } from '@server/libraries/socket'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { NotificationDomainModule } from '../domain'

import { NotificationPropertySubscriber } from './subscribers/notification.property.subscriber'

import { NotificationTenantSubscriber } from './subscribers/notification.tenant.subscriber'

import { NotificationLeaseSubscriber } from './subscribers/notification.lease.subscriber'

import { NotificationDocumentSubscriber } from './subscribers/notification.document.subscriber'

import { NotificationMaintenanceSubscriber } from './subscribers/notification.maintenance.subscriber'

import { NotificationPaymentSubscriber } from './subscribers/notification.payment.subscriber'

import { NotificationRuleSubscriber } from './subscribers/notification.rule.subscriber'

import { NotificationUtilityBillSubscriber } from './subscribers/notification.utilityBill.subscriber'

@Module({
  imports: [AuthorizationDomainModule, NotificationDomainModule, SocketModule],
  providers: [
    NotificationPropertySubscriber,

    NotificationTenantSubscriber,

    NotificationLeaseSubscriber,

    NotificationDocumentSubscriber,

    NotificationMaintenanceSubscriber,

    NotificationPaymentSubscriber,

    NotificationRuleSubscriber,

    NotificationUtilityBillSubscriber,
  ],
  exports: [],
})
export class NotificationInfrastructureModule {}
