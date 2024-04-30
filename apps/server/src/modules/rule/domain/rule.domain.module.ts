import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { RuleDomainFacade } from './rule.domain.facade'
import { Rule } from './rule.model'

@Module({
  imports: [TypeOrmModule.forFeature([Rule]), DatabaseHelperModule],
  providers: [RuleDomainFacade, RuleDomainFacade],
  exports: [RuleDomainFacade],
})
export class RuleDomainModule {}
