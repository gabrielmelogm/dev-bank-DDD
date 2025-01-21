import { DataSource, Repository } from "typeorm"
import { BankAccountSchema } from "../../infra/db/schemas/bank-account.schema"
import { BankAccountTypeOrmRepository } from "../../infra/db/implements/bank-account-typeorm.repository"
import { BankAccountService } from "./bank-account.service"
import { BankAccount } from "../entities/bank-account"
import { TransferService } from "./transfer.service"
import { UserSchema } from "../../infra/db/schemas/user.schema"
import { UserTypeOrmRepository } from "../../infra/db/implements/user-typeorm.repository"
import { UserService } from "./user.service"
import { User } from "../entities/user"

describe('BankAccountService Test', () => {
  let dataSource: DataSource
  let ormRepo: Repository<BankAccountSchema>
  let userRepo: Repository<UserSchema>
  let repository: BankAccountTypeOrmRepository
  let userRepository: UserTypeOrmRepository
  let bankAccountService: BankAccountService
  let userService: UserService
  let transferService: TransferService

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
    userRepo = dataSource.getRepository(UserSchema)
    repository = new BankAccountTypeOrmRepository(ormRepo)
    userRepository = new UserTypeOrmRepository(userRepo)
    bankAccountService = new BankAccountService(repository)
    userService = new UserService(userRepository, bankAccountService)
    transferService = new TransferService()
  })

  it('should create a new bank account', async () => {
    const user = await userService.create(new User({
      name: 'John Doe',
      email: 'john@mail.com'
    }))
    await bankAccountService.create('9999-99', user)
    const model = await ormRepo.findOneBy({ account_number: '9999-99' })

    expect(model.balance).toBe(0)
    expect(model.account_number).toBe('9999-99')
  })

  it('should be find one bank account by id', async () => {
    const user = await userService.create(new User({
      name: 'John Doe',
      email: 'john@mail.com'
    }))
    await bankAccountService.create('9999-99', user)
    const model = await ormRepo.findOneBy({ account_number: '9999-99' })
    const bankAccount = await bankAccountService.findOne(model.id)

    expect(bankAccount.balance).toBe(0)
    expect(bankAccount.account_number).toBe('9999-99')
  })

  it('should be find all accounts', async () => {
    const idsToCreate: string[] = ['1111-11', '2222-22', '3333-33']
    const user = await userService.create(new User({
      name: 'John Doe',
      email: 'john@mail.com'
    }))

    for (const id of idsToCreate) {
      await bankAccountService.create(id, user)
    }

    const bankAccounts = await bankAccountService.findAll()

    expect(bankAccounts).toBeInstanceOf(Array<BankAccount>)
  })

  it('should be transfer an amount from an account to other account', async () => {
    const idSource = '1111-11'
    const idDest = '2222-22'

    const amount = 50

    const user = await userService.create(new User({
      name: 'John Doe',
      email: 'john@mail.com'
    }))

    await bankAccountService.create(idSource, user)
    await bankAccountService.create(idDest, user)

    const bankAccountSrc = await repository.findByAccountNumber(idSource)
    const bankAccountDest = await repository.findByAccountNumber(idDest)

    expect(bankAccountSrc.balance).toBe(0)
    expect(bankAccountDest.balance).toBe(0)

    transferService.transfer(bankAccountSrc, bankAccountDest, amount)

    expect(bankAccountSrc.balance).toBe(-50)
    expect(bankAccountDest.balance).toBe(50)
  })

  it('should generate an valid account number', () => {
    const accountNumber = bankAccountService.generateAccountNumber()
    expect(accountNumber.length).toBe(7)
    expect(accountNumber.includes('-')).toBe(true)

    const numbers = accountNumber.split('-')

    expect(numbers[0].length).toBe(4)
    expect(numbers[1].length).toBe(2)
  })
})