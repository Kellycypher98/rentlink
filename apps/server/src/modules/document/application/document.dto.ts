import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class DocumentCreateDto {
  @IsString()
  @IsNotEmpty()
  documentType: string

  @IsString()
  @IsNotEmpty()
  filePathUrl: string

  @IsString()
  @IsOptional()
  propertyId?: string

  @IsString()
  @IsOptional()
  tenantId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}

export class DocumentUpdateDto {
  @IsString()
  @IsOptional()
  documentType?: string

  @IsString()
  @IsOptional()
  filePathUrl?: string

  @IsString()
  @IsOptional()
  propertyId?: string

  @IsString()
  @IsOptional()
  tenantId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}
