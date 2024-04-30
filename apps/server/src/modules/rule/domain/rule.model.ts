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
export class Rule {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  description: string

  @Column({})
  propertyId: string

  @ManyToOne(() => Property, parent => parent.rules)
  @JoinColumn({ name: 'propertyId' })
  property?: Property

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
