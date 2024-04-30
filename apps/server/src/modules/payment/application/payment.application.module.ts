import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { PaymentDomainModule } from '../domain'
import { PaymentController } from './payment.controller'

import { LeaseDomainModule } from '../../../modules/lease/domain'

import { PaymentByLeaseController } from './paymentByLease.controller'

@Module({
  imports: [AuthenticationDomainModule, PaymentDomainModule, LeaseDomainModule],
  controllers: [PaymentController, PaymentByLeaseController],
  providers: [],
})
export class PaymentApplicationModule {}
