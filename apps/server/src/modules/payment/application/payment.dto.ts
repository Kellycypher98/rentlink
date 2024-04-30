import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class PaymentCreateDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number

  @IsString()
  @IsNotEmpty()
  dueDate: string

  @IsString()
  @IsOptional()
  paymentDate?: string

  @IsString()
  @IsOptional()
  paymentStatus?: string

  @IsString()
  @IsOptional()
  leaseId?: string

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

export class PaymentUpdateDto {
  @IsNumber()
  @IsOptional()
  amount?: number

  @IsString()
  @IsOptional()
  dueDate?: string

  @IsString()
  @IsOptional()
  paymentDate?: string

  @IsString()
  @IsOptional()
  paymentStatus?: string

  @IsString()
  @IsOptional()
  leaseId?: string

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
