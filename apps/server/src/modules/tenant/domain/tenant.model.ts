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

import { Property } from '../../../modules/property/domain'

import { Lease } from '../../../modules/lease/domain'

import { Document } from '../../../modules/document/domain'

@Entity()
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.tenants)
  @JoinColumn({ name: 'userId' })
  user?: User

  @Column({})
  propertyId: string

  @ManyToOne(() => Property, parent => parent.tenants)
  @JoinColumn({ name: 'propertyId' })
  property?: Property

  @OneToMany(() => Lease, child => child.tenant)
  leases?: Lease[]

  @OneToMany(() => Document, child => child.tenant)
  documents?: Document[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
