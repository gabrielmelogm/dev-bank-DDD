import { BankAccountTypeOrmRepository } from 'src/@core/infra/db/implements/bank-account-typeorm.repository';
import { BankAccountSchema } from 'src/@core/infra/db/schemas/bank-account.schema';
import { DataSource, Repository } from 'typeorm';
import { User } from '../../entities/user';
import { BankAccount } from '../../entities/bank-account';
import { FindAllBankAccounts } from './find-all-bank-accounts.usecase';
import { GenerateBankAccountNumberUseCase } from './generate-bank-account-number.usecase';
import { inMemoryTypeOrmConnectionConfig } from 'src/@core/infra/db/config/providers/inMemory-typeorm-connection.config';

describe('FindOneBankAccountById Test', () => {
  let dataSource: DataSource;
  let ormRepo: Repository<BankAccountSchema>;
  let repository: BankAccountTypeOrmRepository;
  let findAllBankAccounts: FindAllBankAccounts;
  let generateBankAccountUseCase: GenerateBankAccountNumberUseCase;

  beforeEach(async () => {
    dataSource = new DataSource(inMemoryTypeOrmConnectionConfig);
    await dataSource.initialize();
    ormRepo = dataSource.getRepository(BankAccountSchema);
    repository = new BankAccountTypeOrmRepository(ormRepo);
    findAllBankAccounts = new FindAllBankAccounts(repository);
    generateBankAccountUseCase = new GenerateBankAccountNumberUseCase();
  });

  it('should be find an bank account by id', async () => {
    const user = new User({
      name: 'John Doe',
      email: 'john@mail.com',
    });

    for (let index = 1; index <= 10; index++) {
      await repository.insert(
        new BankAccount({
          balance: 0,
          account_number: generateBankAccountUseCase.handle(),
          owner: user,
        }),
      );
    }

    const createdBankAccounts = await findAllBankAccounts.handle();

    expect(createdBankAccounts).toBeInstanceOf(Array<BankAccount>);
  });
});
