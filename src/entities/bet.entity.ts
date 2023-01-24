import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DateTimeEntity } from './base';

@Entity('bets', { orderBy: { id: 'ASC' } })
export class Bet extends DateTimeEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({nullable: true})
  matchId: string;

  @Column({nullable: true})
  sportName: string;

  @Column({nullable: true})
  betDate: string;
  
  @Column({nullable: true})
  matchDate: string;

  @Column({nullable: true})
  betData: string;
}
