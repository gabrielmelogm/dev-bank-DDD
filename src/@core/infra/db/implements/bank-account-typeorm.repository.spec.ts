import { DataSource, Repository } from "typeorm"
import { BankAccountTypeOrmRepository } from "./bank-account-typeorm.repository"
import { BankAccountSchema } from "../schemas/bank-account.schema"
import { BankAccount } from "../../../domain/entities/bank-account"
import { UserSchema } from "../schemas/user.schema"

describe('BankAccountTypeOrmRepository Test', () => {
  let dataSource: DataSource
  let ormRepo: Repository<BankAccountSchema>
  let repository: BankAccountTypeOrmRepository

  beforeEach(async () => {
    dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: false,
      entities: [BankAccountSchema, UserSchema]
    })
    await dataSource.initialize()
    ormRepo = dataSource.getRepository(BankAccountSchema)
    repository = new BankAccountTypeOrmRepository(ormRepo)
  })

  it('should insert a new bank account', async () => {
    const bankAccount = new BankAccount({
      id: '123',
      account_number: '1111-11',
      balance: 100
    })
    const insertSpy = jest.spyOn(repository, 'insert').mockResolvedValue(undefined)

    await repository.insert(bankAccount)

    expect(insertSpy).toHaveBeenCalledWith(bankAccount)
    expect(insertSpy).toHaveBeenCalledTimes(1)
  })

  it('should update a bank', async () => {
    const currentBankAccount = new BankAccount({
      id: '123',
      account_number: '1111-11',
      balance: 100
    })

    const updatedBankAccount = new BankAccount({
      id: currentBankAccount.id,
      account_number: currentBankAccount.account_number,
      balance: 50
    })

    await repository.update(updatedBankAccount)

    expect(currentBankAccount.id).toBe(updatedBankAccount.id)
    expect(currentBankAccount.account_number).toBe(updatedBankAccount.account_number)
    expect(updatedBankAccount.balance).toBe(50)
  })

  it('should find all bank accounts', async () => {
    let bankAccounts: BankAccount[] = []

    for (let count = 1; count <= 8; count++) {
      const bankAccount = new BankAccount({
        id: String(count),
        account_number: `${count}${count}${count}${count}-${count}${count}`,
        balance: 0
      })
      expect(bankAccount).toHaveProperty('id')
      bankAccounts.push(bankAccount)
    }

    expect(bankAccounts).toBeInstanceOf(Array<BankAccount>)

    for (const bankAccount of bankAccounts) {
      await repository.insert(bankAccount)
      const model = await repository.findByAccountNumber(bankAccount.account_number)
      expect(model).toHaveProperty('id')
      expect(model).toHaveProperty('balance')
      expect(model).toHaveProperty('account_number')
    }

    const models = await repository.findAll()

    for (const model of models) {
      const accountInstance = new BankAccount(model)
      expect(accountInstance).toBeInstanceOf(BankAccount)
    }
  })

  it('should find an account by id', async () => {
    const bankAccount = new BankAccount({
      id: '123',
      account_number: '1111-11',
      balance: 100
    })

    await repository.insert(bankAccount)
    const model = await ormRepo.findOneBy({ id: bankAccount.id })

    expect(model.id).toBe('123')
    expect(model.balance).toBe(100)
    expect(model.account_number).toBe('1111-11')
  })

  it('should find one account by account number', async () => {
    const bankAccount = new BankAccount({
      id: '123',
      account_number: '1111-11',
      balance: 100
    })

    await repository.insert(bankAccount)
    const model = await ormRepo.findOneBy({ account_number: '1111-11' })

    expect(model.id).toBe('123')
    expect(model.balance).toBe(100)
    expect(model.account_number).toBe('1111-11')
  })
})