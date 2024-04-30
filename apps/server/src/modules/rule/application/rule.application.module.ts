import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { RuleDomainModule } from '../domain'
import { RuleController } from './rule.controller'

import { PropertyDomainModule } from '../../../modules/property/domain'

import { RuleByPropertyController } from './ruleByProperty.controller'

@Module({
  imports: [AuthenticationDomainModule, RuleDomainModule, PropertyDomainModule],
  controllers: [RuleController, RuleByPropertyController],
  providers: [],
})
export class RuleApplicationModule {}
