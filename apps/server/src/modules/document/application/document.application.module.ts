import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { DocumentDomainModule } from '../domain'
import { DocumentController } from './document.controller'

import { PropertyDomainModule } from '../../../modules/property/domain'

import { DocumentByPropertyController } from './documentByProperty.controller'

import { TenantDomainModule } from '../../../modules/tenant/domain'

import { DocumentByTenantController } from './documentByTenant.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    DocumentDomainModule,

    PropertyDomainModule,

    TenantDomainModule,
  ],
  controllers: [
    DocumentController,

    DocumentByPropertyController,

    DocumentByTenantController,
  ],
  providers: [],
})
export class DocumentApplicationModule {}
