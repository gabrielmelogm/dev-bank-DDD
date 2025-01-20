import { DataSource, Repository } from "typeorm"
import { BankAccountSchema } from "../infra/db/bank-account.schema"
import { BankAccountTypeOrmRepository } from "../infra/db/bank-account-typeorm.repository"
import { BankAccountService } from "./bank-account.service"

describe('BankAccountTypeOrmRepository Test', () => {
  let dataSource: DataSource
  let ormRepo: Repository<BankAccountSchema>
  let repository: BankAccountTypeOrmRepository
  let bankAccountService: BankAccountService

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
    bankAccountService = new BankAccountService(repository)
  })

  it('should create a new bank account', async () => {
    await bankAccountService.create('9999-99')
    const model = await ormRepo.findOneBy({ account_number: '9999-99' })

    expect(model.balance).toBe(0)
    expect(model.account_number).toBe('9999-99')
  })
})