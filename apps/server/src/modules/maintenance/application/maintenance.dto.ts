import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class MaintenanceCreateDto {
  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsOptional()
  status?: string

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

export class MaintenanceUpdateDto {
  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  status?: string

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
