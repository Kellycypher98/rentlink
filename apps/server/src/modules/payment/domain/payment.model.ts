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

import { Lease } from '../../../modules/lease/domain'

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ColumnNumeric({ type: 'numeric' })
  amount: number

  @Column({})
  dueDate: string

  @Column({ nullable: true })
  paymentDate?: string

  @Column({ nullable: true })
  paymentStatus?: string

  @Column({})
  leaseId: string

  @ManyToOne(() => Lease, parent => parent.payments)
  @JoinColumn({ name: 'leaseId' })
  lease?: Lease

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
