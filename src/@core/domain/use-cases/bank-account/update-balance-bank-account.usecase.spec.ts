import { BankAccountTypeOrmRepository } from 'src/@core/infra/db/implements/bank-account-typeorm.repository';
import { BankAccountSchema } from 'src/@core/infra/db/schemas/bank-account.schema';
import { DataSource, Repository } from 'typeorm';
import { FindBankAccountByAccountNumberUseCase } from './find-bank-account-by-account-number.usecase';
import { User } from '../../entities/user';
import { BankAccount } from '../../entities/bank-account';
import { UpdateBalanceBankAccountUseCase } from './update-balance-bank-account.usecase';
import { inMemoryTypeOrmConnectionConfig } from 'src/@core/infra/db/config/providers/inMemory-typeorm-connection.config';

describe('UpdateBalanceBankAccountUseCase Test', () => {
  let dataSource: DataSource;
  let ormRepo: Repository<BankAccountSchema>;
  let repository: BankAccountTypeOrmRepository;
  let findBankAccountByAccountNumberUseCase: FindBankAccountByAccountNumberUseCase;
  let updateBalanceBankAccountUseCase: UpdateBalanceBankAccountUseCase;

  beforeEach(async () => {
    dataSource = new DataSource(inMemoryTypeOrmConnectionConfig);
    await dataSource.initialize();
    ormRepo = dataSource.getRepository(BankAccountSchema);
    repository = new BankAccountTypeOrmRepository(ormRepo);
    findBankAccountByAccountNumberUseCase =
      new FindBankAccountByAccountNumberUseCase(repository);
    updateBalanceBankAccountUseCase = new UpdateBalanceBankAccountUseCase(
      repository,
      findBankAccountByAccountNumberUseCase,
    );
  });

  it('should be update an balance in an bank account', async () => {
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

    let foundBankAccount = await findBankAccountByAccountNumberUseCase.handle(
      bankAccount.account_number,
    );

    expect(foundBankAccount.balance).toBe(0);

    const toUpdateBankAccount = new BankAccount({
      balance: 100,
      account_number: '1234-00',
      owner,
    });

    await updateBalanceBankAccountUseCase.handle(toUpdateBankAccount);

    foundBankAccount = await findBankAccountByAccountNumberUseCase.handle(
      bankAccount.account_number,
    );

    expect(foundBankAccount.balance).toBe(100);
  });
});
