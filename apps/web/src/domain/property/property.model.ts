import { User } from '../user'

import { Tenant } from '../tenant'

import { Lease } from '../lease'

import { Document } from '../document'

import { Maintenance } from '../maintenance'

import { Rule } from '../rule'

import { UtilityBill } from '../utilityBill'

export class Property {
  id: string

  address: string

  description?: string

  landlordId: string

  landlord?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  tenants?: Tenant[]

  leases?: Lease[]

  documents?: Document[]

  maintenances?: Maintenance[]

  rules?: Rule[]

  utilityBills?: UtilityBill[]
}
