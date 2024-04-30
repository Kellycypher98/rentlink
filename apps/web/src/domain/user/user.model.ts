import { Notification } from '../notification'

import { Property } from '../property'

import { Tenant } from '../tenant'

export enum UserStatus {
  CREATED = 'CREATED',
  VERIFIED = 'VERIFIED',
}
export class User {
  id: string
  email: string
  status: UserStatus
  name: string
  pictureUrl: string
  password: string
  dateCreated: string
  dateUpdated: string
  notifications?: Notification[]

  propertysAsLandlord?: Property[]

  tenants?: Tenant[]
}
