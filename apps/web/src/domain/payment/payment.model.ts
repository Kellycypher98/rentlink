import { Lease } from '../lease'

export class Payment {
  id: string

  amount: number

  dueDate: string

  paymentDate?: string

  paymentStatus?: string

  leaseId: string

  lease?: Lease

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
