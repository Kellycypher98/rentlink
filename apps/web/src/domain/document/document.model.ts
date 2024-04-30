import { Property } from '../property'

import { Tenant } from '../tenant'

export class Document {
  id: string

  documentType: string

  filePathUrl: string

  propertyId: string

  property?: Property

  tenantId?: string

  tenant?: Tenant

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
