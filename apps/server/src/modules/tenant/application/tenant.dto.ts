import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class TenantCreateDto {
  @IsString()
  @IsOptional()
  userId?: string

  @IsString()
  @IsOptional()
  propertyId?: string

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

export class TenantUpdateDto {
  @IsString()
  @IsOptional()
  userId?: string

  @IsString()
  @IsOptional()
  propertyId?: string

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
