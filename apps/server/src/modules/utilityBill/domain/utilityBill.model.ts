import { ColumnNumeric } from '@server/core/database'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Property } from '../../../modules/property/domain'

@Entity()
export class UtilityBill {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  billType: string

  @ColumnNumeric({ type: 'numeric' })
  amount: number

  @Column({})
  dueDate: string

  @Column({})
  propertyId: string

  @ManyToOne(() => Property, parent => parent.utilityBills)
  @JoinColumn({ name: 'propertyId' })
  property?: Property

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
