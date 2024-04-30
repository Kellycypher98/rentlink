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

import { Tenant } from '../../../modules/tenant/domain'

import { Payment } from '../../../modules/payment/domain'

@Entity()
export class Lease {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  startDate: string

  @Column({})
  endDate: string

  @ColumnNumeric({ type: 'numeric' })
  rentAmount: number

  @Column({})
  propertyId: string

  @ManyToOne(() => Property, parent => parent.leases)
  @JoinColumn({ name: 'propertyId' })
  property?: Property

  @Column({})
  tenantId: string

  @ManyToOne(() => Tenant, parent => parent.leases)
  @JoinColumn({ name: 'tenantId' })
  tenant?: Tenant

  @OneToMany(() => Payment, child => child.lease)
  payments?: Payment[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
