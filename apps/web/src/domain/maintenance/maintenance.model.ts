import { Property } from '../property'

export class Maintenance {
  id: string

  description: string

  status?: string

  propertyId: string

  property?: Property

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
