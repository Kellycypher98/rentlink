import { Property } from "../property";
import { Tenant } from "../tenant";

export class Document {
  constructor(
    id,
    documentType,
    filePathUrl,
    propertyId,
    property,
    tenantId,
    tenant,
    dateCreated,
    dateDeleted,
    dateUpdated
  ) {
    this.id = id;
    this.documentType = documentType;
    this.filePathUrl = filePathUrl;
    this.propertyId = propertyId;
    this.property = property;
    this.tenantId = tenantId;
    this.tenant = tenant;
    this.dateCreated = dateCreated;
    this.dateDeleted = dateDeleted;
    this.dateUpdated = dateUpdated;
  }
}
