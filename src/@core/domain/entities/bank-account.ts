import { v4 as uuid } from 'uuid'
import { User } from './user'

interface BankAccountProps {
  id?: string
  balance: number
  account_number: string
  owner?: User
}

export class BankAccount {
  id?: string
  balance: number
  account_number: string
  owner?: User

  constructor(bankAccount: BankAccountProps) {
    this.id = bankAccount.id ?? uuid()
    this.balance = bankAccount.balance
    this.account_number = bankAccount.account_number
    this.owner = bankAccount.owner
  }

  debit(amount: number): void {
    this.balance -= amount
  }

  credit(amount: number): void {
    this.balance += amount
  }

  addOwner(owner: User) {
    this.owner = owner
  }
}