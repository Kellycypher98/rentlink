import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { PropertyApi } from './property/property.api'

import { TenantApi } from './tenant/tenant.api'

import { LeaseApi } from './lease/lease.api'

import { DocumentApi } from './document/document.api'

import { MaintenanceApi } from './maintenance/maintenance.api'

import { PaymentApi } from './payment/payment.api'

import { RuleApi } from './rule/rule.api'

import { UtilityBillApi } from './utilityBill/utilityBill.api'

export namespace Api {
  export class Ai extends AiApi {}
  export class Authentication extends AuthenticationApi {}
  export class Authorization extends AuthorizationApi {}
  export class Upload extends UploadApi {}

  export class User extends UserApi {}

  export class Notification extends NotificationApi {}

  export class Property extends PropertyApi {}

  export class Tenant extends TenantApi {}

  export class Lease extends LeaseApi {}

  export class Document extends DocumentApi {}

  export class Maintenance extends MaintenanceApi {}

  export class Payment extends PaymentApi {}

  export class Rule extends RuleApi {}

  export class UtilityBill extends UtilityBillApi {}
}
