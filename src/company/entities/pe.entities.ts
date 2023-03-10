import {
  Entity,
  Column,
  // PrimaryGeneratedColumn,
  PrimaryColumn,
  // Generated,
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

  @Column()
  pe_1: string;

  @Column()
  pe_2: string;

  @Column()
  pe_3: string;

  @Column()
  pe_4: string;

  @Column()
  pe_5: string;

  @Column()
  pe_6: string;

  // @Column({ type: 'date' })   // all types are working here
  // @CreateDateColumn()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;
}
