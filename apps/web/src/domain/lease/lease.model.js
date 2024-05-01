import { Property } from "../property";
import { Tenant } from "../tenant";
import { Payment } from "../payment";

export class Lease {
  constructor() {
    this.id = "";
    this.startDate = "";
    this.endDate = "";
    this.rentAmount = 0;
    this.propertyId = "";
    this.tenantId = "";
    this.dateCreated = "";
    this.dateDeleted = "";
    this.dateUpdated = "";
    this.property = undefined;
    this.tenant = undefined;
    this.payments = [];
  }
}
