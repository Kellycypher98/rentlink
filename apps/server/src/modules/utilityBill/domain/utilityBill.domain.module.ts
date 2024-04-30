import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { UtilityBillDomainFacade } from './utilityBill.domain.facade'
import { UtilityBill } from './utilityBill.model'

@Module({
  imports: [TypeOrmModule.forFeature([UtilityBill]), DatabaseHelperModule],
  providers: [UtilityBillDomainFacade, UtilityBillDomainFacade],
  exports: [UtilityBillDomainFacade],
})
export class UtilityBillDomainModule {}
