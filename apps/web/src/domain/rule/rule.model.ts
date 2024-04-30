import { Property } from '../property'

export class Rule {
  id: string

  description: string

  propertyId: string

  property?: Property

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
