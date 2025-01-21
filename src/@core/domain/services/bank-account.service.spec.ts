import { DataSource, Repository } from "typeorm"
import { BankAccountSchema } from "../../infra/db/schemas/bank-account.schema"
import { BankAccountTypeOrmRepository } from "../../infra/db/implements/bank-account-typeorm.repository"
import { BankAccountService } from "./bank-account.service"
import { BankAccount } from "../entities/bank-account"
import { TransferService } from "./transfer.service"

describe('BankAccountService Test', () => {
  let dataSource: DataSource
  let ormRepo: Repository<BankAccountSchema>
  let repository: BankAccountTypeOrmRepository
  let bankAccountService: BankAccountService
  let transferService: TransferService

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
    transferService = new TransferService()
  })

  it('should create a new bank account', async () => {
    await bankAccountService.create('9999-99')
    const model = await ormRepo.findOneBy({ account_number: '9999-99' })

    expect(model.balance).toBe(0)
    expect(model.account_number).toBe('9999-99')
  })

  it('should be find one bank account by id', async () => {
    await bankAccountService.create('9999-99')
    const model = await ormRepo.findOneBy({ account_number: '9999-99' })
    const bankAccount = await bankAccountService.findOne(model.id)

    expect(bankAccount.balance).toBe(0)
    expect(bankAccount.account_number).toBe('9999-99')
  })

  it('should be find all accounts', async () => {
    const idsToCreate: string[] = ['1111-11', '2222-22', '3333-33']

    for (const id of idsToCreate) {
      await bankAccountService.create(id)
    }

    const bankAccounts = await bankAccountService.findAll()

    expect(bankAccounts).toBeInstanceOf(Array<BankAccount>)
  })

  it('should be transfer an amount from an account to other account', async () => {
    const idSource = '1111-11'
    const idDest = '2222-22'

    const amount = 50

    await bankAccountService.create(idSource)
    await bankAccountService.create(idDest)

    const bankAccountSrc = await repository.findByAccountNumber(idSource)
    const bankAccountDest = await repository.findByAccountNumber(idDest)

    expect(bankAccountSrc.balance).toBe(0)
    expect(bankAccountDest.balance).toBe(0)

    transferService.transfer(bankAccountSrc, bankAccountDest, amount)

    expect(bankAccountSrc.balance).toBe(-50)
    expect(bankAccountDest.balance).toBe(50)
  })
})