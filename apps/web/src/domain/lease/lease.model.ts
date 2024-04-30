import { Property } from '../property'

import { Tenant } from '../tenant'

import { Payment } from '../payment'

export class Lease {
  id: string

  startDate: string

  endDate: string

  rentAmount: number

  propertyId: string

  property?: Property

  tenantId: string

  tenant?: Tenant

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  payments?: Payment[]
}
