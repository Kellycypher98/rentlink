import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class PropertyCreateDto {
  @IsString()
  @IsNotEmpty()
  address: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  landlordId?: string

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

export class PropertyUpdateDto {
  @IsString()
  @IsOptional()
  address?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  landlordId?: string

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
