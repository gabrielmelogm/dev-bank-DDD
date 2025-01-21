import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { UserSchema as User } from './user.schema';

@Entity()
export class BankAccountSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', scale: 2 })
  balance: number;

  @Column({ length: 255 })
  account_number: string;

  @OneToOne(() => User, (user) => user.bankAccount)
  owner: User
}
