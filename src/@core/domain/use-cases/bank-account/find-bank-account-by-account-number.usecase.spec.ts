import { BankAccountTypeOrmRepository } from 'src/@core/infra/db/implements/bank-account-typeorm.repository';
import { BankAccountSchema } from 'src/@core/infra/db/schemas/bank-account.schema';
import { DataSource, Repository } from 'typeorm';
import { FindBankAccountByAccountNumberUseCase } from './find-bank-account-by-account-number.usecase';
import { BankAccount } from '../../entities/bank-account';
import { User } from '../../entities/user';
import { UserSchema } from 'src/@core/infra/db/schemas/user.schema';

describe('FindBankAccountByAccountNumberUseCase Test', () => {
  let dataSource: DataSource;
  let ormRepo: Repository<BankAccountSchema>;
  let repository: BankAccountTypeOrmRepository;
  let findBankAccountByAccountNumberUseCase: FindBankAccountByAccountNumberUseCase;

  beforeEach(async () => {
    dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: false,
      entities: [BankAccountSchema, UserSchema],
    });
    await dataSource.initialize();
    ormRepo = dataSource.getRepository(BankAccountSchema);
    repository = new BankAccountTypeOrmRepository(ormRepo);
    findBankAccountByAccountNumberUseCase =
      new FindBankAccountByAccountNumberUseCase(repository);
  });

  it('should be find an bank account by account number', async () => {
    const owner = new User({
      name: 'John Doe',
      email: 'john@mail.com',
    });
    const bankAccount = new BankAccount({
      balance: 0,
      account_number: '1234-00',
      owner,
    });
    await repository.insert(bankAccount);

    const createdBankAccount =
      await findBankAccountByAccountNumberUseCase.handle(
        bankAccount.account_number,
      );

    expect(createdBankAccount).toBeInstanceOf(BankAccount);
  });
});
