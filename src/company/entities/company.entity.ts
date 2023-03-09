import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({ length: 100 })
  name: string;

  @Column()
  last_agm: string;

  @Column()
  market_capitalization_mn: string;

  @Column()
  authorized_capital_mn: string;

  @Column()
  paidup_capital_mn: string;

  @Column()
  type_of_instrument: string;

  @Column()
  total_outstanding_share: string;

  @Column()
  face_par_value: string;

  @Column()
  sector: string;

  @Column()
  cash_dividend: string;

  @Column()
  bonus_issued_stock_dividend: string;

  @Column()
  pe: string;

  @Column()
  eps: string;

  @Column()
  listing_since: string;

  @Column()
  category: string;

  @Column()
  ponsor_director: string;

  @Column()
  govt: string;

  @Column()
  institute: string;

  @Column()
  foreign: string;

  @Column()
  public: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  email: string;
}
