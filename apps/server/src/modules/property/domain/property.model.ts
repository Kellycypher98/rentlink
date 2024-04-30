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

import { User } from '../../../modules/user/domain'

import { Tenant } from '../../../modules/tenant/domain'

import { Lease } from '../../../modules/lease/domain'

import { Document } from '../../../modules/document/domain'

import { Maintenance } from '../../../modules/maintenance/domain'

import { Rule } from '../../../modules/rule/domain'

import { UtilityBill } from '../../../modules/utilityBill/domain'

@Entity()
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  address: string

  @Column({ nullable: true })
  description?: string

  @Column({})
  landlordId: string

  @ManyToOne(() => User, parent => parent.propertysAsLandlord)
  @JoinColumn({ name: 'landlordId' })
  landlord?: User

  @OneToMany(() => Tenant, child => child.property)
  tenants?: Tenant[]

  @OneToMany(() => Lease, child => child.property)
  leases?: Lease[]

  @OneToMany(() => Document, child => child.property)
  documents?: Document[]

  @OneToMany(() => Maintenance, child => child.property)
  maintenances?: Maintenance[]

  @OneToMany(() => Rule, child => child.property)
  rules?: Rule[]

  @OneToMany(() => UtilityBill, child => child.property)
  utilityBills?: UtilityBill[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
