import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { LeaseDomainFacade } from './lease.domain.facade'
import { Lease } from './lease.model'

@Module({
  imports: [TypeOrmModule.forFeature([Lease]), DatabaseHelperModule],
  providers: [LeaseDomainFacade, LeaseDomainFacade],
  exports: [LeaseDomainFacade],
})
export class LeaseDomainModule {}
