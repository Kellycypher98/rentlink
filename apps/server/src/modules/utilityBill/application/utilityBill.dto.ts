import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class UtilityBillCreateDto {
  @IsString()
  @IsNotEmpty()
  billType: string

  @IsNumber()
  @IsNotEmpty()
  amount: number

  @IsString()
  @IsNotEmpty()
  dueDate: string

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

export class UtilityBillUpdateDto {
  @IsString()
  @IsOptional()
  billType?: string

  @IsNumber()
  @IsOptional()
  amount?: number

  @IsString()
  @IsOptional()
  dueDate?: string

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
