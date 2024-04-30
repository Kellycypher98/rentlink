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

@Entity()
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  documentType: string

  @Column({})
  filePathUrl: string

  @Column({})
  propertyId: string

  @ManyToOne(() => Property, parent => parent.documents)
  @JoinColumn({ name: 'propertyId' })
  property?: Property

  @Column({ nullable: true })
  tenantId?: string

  @ManyToOne(() => Tenant, parent => parent.documents)
  @JoinColumn({ name: 'tenantId' })
  tenant?: Tenant

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
