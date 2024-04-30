import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { PropertyDomainModule } from '../domain'
import { PropertyController } from './property.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { PropertyByUserController } from './propertyByUser.controller'

@Module({
  imports: [AuthenticationDomainModule, PropertyDomainModule, UserDomainModule],
  controllers: [PropertyController, PropertyByUserController],
  providers: [],
})
export class PropertyApplicationModule {}
