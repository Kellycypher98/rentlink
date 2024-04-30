import { User } from '../user'

import { Property } from '../property'

import { Lease } from '../lease'

import { Document } from '../document'

export class Tenant {
  id: string

  userId: string

  user?: User

  propertyId: string

  property?: Property

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  leases?: Lease[]

  documents?: Document[]
}
