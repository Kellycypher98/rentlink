import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { Property as PropertyModel } from './property/property.model'

import { Tenant as TenantModel } from './tenant/tenant.model'

import { Lease as LeaseModel } from './lease/lease.model'

import { Document as DocumentModel } from './document/document.model'

import { Maintenance as MaintenanceModel } from './maintenance/maintenance.model'

import { Payment as PaymentModel } from './payment/payment.model'

import { Rule as RuleModel } from './rule/rule.model'

import { UtilityBill as UtilityBillModel } from './utilityBill/utilityBill.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}

  export class User extends UserModel {}

  export class Notification extends NotificationModel {}

  export class Property extends PropertyModel {}

  export class Tenant extends TenantModel {}

  export class Lease extends LeaseModel {}

  export class Document extends DocumentModel {}

  export class Maintenance extends MaintenanceModel {}

  export class Payment extends PaymentModel {}

  export class Rule extends RuleModel {}

  export class UtilityBill extends UtilityBillModel {}
}
