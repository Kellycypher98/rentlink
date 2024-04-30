import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { UtilityBillDomainModule } from '../domain'
import { UtilityBillController } from './utilityBill.controller'

import { PropertyDomainModule } from '../../../modules/property/domain'

import { UtilityBillByPropertyController } from './utilityBillByProperty.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    UtilityBillDomainModule,

    PropertyDomainModule,
  ],
  controllers: [UtilityBillController, UtilityBillByPropertyController],
  providers: [],
})
export class UtilityBillApplicationModule {}
