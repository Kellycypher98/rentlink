import { Lease } from "../lease";

export class Payment {
  constructor(
    id,
    amount,
    dueDate,
    leaseId,
    dateCreated,
    dateDeleted,
    dateUpdated
  ) {
    this.id = id;
    this.amount = amount;
    this.dueDate = dueDate;
    this.leaseId = leaseId;
    this.dateCreated = dateCreated;
    this.dateDeleted = dateDeleted;
    this.dateUpdated = dateUpdated;
  }
}
