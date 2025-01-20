import { DataSource, Repository } from "typeorm"
import { BankAccountTypeOrmRepository } from "./bank-account-typeorm.repository"
import { BankAccountSchema } from "./bank-account.schema"
import { BankAccount } from "../../domain/bank-account"

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
      entities: [BankAccountSchema]
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
    await repository.insert(bankAccount)
    const model = await ormRepo.findOneBy({ account_number: '1111-11' })

    expect(model.id).toBe('123')
    expect(model.balance).toBe(100)
    expect(model.account_number).toBe('1111-11')
  })
})