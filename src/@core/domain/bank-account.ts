import { v4 as uuid } from 'uuid'

interface BankAccountProps {
  id?: string
  balance: number
  account_number: string
}

export class BankAccount {
  id?: string
  balance: number
  account_number: string

  constructor(bankAccount: BankAccountProps) {
    this.id = bankAccount.id ?? uuid()
    this.balance = bankAccount.balance
    this.account_number = bankAccount.account_number
  }

  debit(amount: number): void {
    this.balance -= amount
  }

  credit(amount: number): void {
    this.balance += amount
  }
}