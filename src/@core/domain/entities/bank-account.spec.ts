import { BankAccount } from "./bank-account"

describe('BankAccount Unit Tests', () => {
  it('should create a bank account', () => {
    const bankAccount = new BankAccount({
      id: '123',
      account_number: '12345',
      balance: 100
    })
    expect(bankAccount.id).toBe('123')
    expect(bankAccount.balance).toBe(100)
    expect(bankAccount.account_number).toBe('12345')
  })

  it('should debit an account', () => {
    const bankAccount = new BankAccount({
      id: '123',
      account_number: '12345',
      balance: 100
    })
    bankAccount.debit(50)
    expect(bankAccount.balance).toBe(50)
  })

  it('should not be able debit an account if amount > balance', () => {
    const bankAccount = new BankAccount({
      id: '123',
      account_number: '12345',
      balance: 100
    })

    expect(() => bankAccount.debit(120)).toThrowError('Insufficient balance')
  })

  it('should credit an account', () => {
    const bankAccount = new BankAccount({
      id: '123',
      account_number: '12345',
      balance: 100
    })
    bankAccount.credit(50)
    expect(bankAccount.balance).toBe(150)
  })
})