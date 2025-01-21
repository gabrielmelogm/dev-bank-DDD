import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BankAccountSchema as BankAccount } from "./bank-account.schema";

@Entity()
export class UserSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @OneToOne(() => BankAccount, (bankAccount) => bankAccount.owner)
  @JoinColumn()
  bankAccount: BankAccount
}