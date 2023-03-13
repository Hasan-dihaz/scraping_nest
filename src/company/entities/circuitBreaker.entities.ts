import {
  Entity,
  Column,
  // PrimaryGeneratedColumn,
  PrimaryColumn,
  // CreateDateColumn,
} from 'typeorm';

@Entity()
export class CircuitBreaker {
  @Column()
  @PrimaryColumn()
  code: string;

  @Column()
  breaker: string;

  @Column()
  tickSize: string;

  @Column()
  openAdjPrice: string;

  @Column()
  floorPrice: string;

  @Column()
  lowerLimit: string;

  @Column()
  upperLimit: string;

  @Column()
  floorPriceBlockMakret: string;

  // @Column({ type: 'date' })   // all types are working here
  // @CreateDateColumn()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;
}
