import {
  Entity,
  Column,
  // PrimaryGeneratedColumn,
  PrimaryColumn,
  // CreateDateColumn,
} from 'typeorm';

@Entity()
export class PE {
  @Column()
  @PrimaryColumn()
  code: string;

  @Column({ length: 100 })
  close_price: string;

  @Column()
  ycp: string;

  @Column({ nullable: true })
  pe_1: string;

  @Column({ nullable: true }) //, default: null
  pe_2: string;

  @Column({ nullable: true })
  pe_3: string;

  @Column({ nullable: true })
  pe_4: string;

  @Column({ nullable: true })
  pe_5: string;

  @Column({ nullable: true })
  pe_6: string;

  // @Column({ type: 'date' })   // all types are working here
  // @CreateDateColumn()

  // @Column({ type: 'date' })
  // // @PrimaryColumn()
  // created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @PrimaryColumn()
  updated_at: Date;
}
