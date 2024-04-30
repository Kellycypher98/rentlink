import { Property } from '../property'

export class UtilityBill {
  id: string

  billType: string

  amount: number

  dueDate: string

  propertyId: string

  property?: Property

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
