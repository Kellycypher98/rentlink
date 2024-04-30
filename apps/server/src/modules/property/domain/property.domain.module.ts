import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { PropertyDomainFacade } from './property.domain.facade'
import { Property } from './property.model'

@Module({
  imports: [TypeOrmModule.forFeature([Property]), DatabaseHelperModule],
  providers: [PropertyDomainFacade, PropertyDomainFacade],
  exports: [PropertyDomainFacade],
})
export class PropertyDomainModule {}
