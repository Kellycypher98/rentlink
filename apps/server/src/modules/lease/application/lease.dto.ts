import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class LeaseCreateDto {
  @IsString()
  @IsNotEmpty()
  startDate: string

  @IsString()
  @IsNotEmpty()
  endDate: string

  @IsNumber()
  @IsNotEmpty()
  rentAmount: number

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

export class LeaseUpdateDto {
  @IsString()
  @IsOptional()
  startDate?: string

  @IsString()
  @IsOptional()
  endDate?: string

  @IsNumber()
  @IsOptional()
  rentAmount?: number

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
