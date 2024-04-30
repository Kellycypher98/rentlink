import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { DocumentDomainFacade } from './document.domain.facade'
import { Document } from './document.model'

@Module({
  imports: [TypeOrmModule.forFeature([Document]), DatabaseHelperModule],
  providers: [DocumentDomainFacade, DocumentDomainFacade],
  exports: [DocumentDomainFacade],
})
export class DocumentDomainModule {}
