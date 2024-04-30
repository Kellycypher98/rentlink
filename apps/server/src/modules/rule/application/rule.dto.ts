import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class RuleCreateDto {
  @IsString()
  @IsNotEmpty()
  description: string

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

export class RuleUpdateDto {
  @IsString()
  @IsOptional()
  description?: string

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
