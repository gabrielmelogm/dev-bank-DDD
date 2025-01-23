import { BankAccountTypeOrmRepository } from 'src/@core/infra/db/implements/bank-account-typeorm.repository';
import { BankAccountSchema } from 'src/@core/infra/db/schemas/bank-account.schema';
import { DataSource, Repository } from 'typeorm';
import { FindOneBankAccountById } from './find-one-bank-account-by-id.usecase';
import { UserSchema } from 'src/@core/infra/db/schemas/user.schema';
import { User } from '../../entities/user';
import { BankAccount } from '../../entities/bank-account';
import { inMemoryTypeOrmConnectionConfig } from 'src/@core/infra/db/config/providers/inMemory-typeorm-connection.config';
import { Exception } from '../../utils/error-exceptions.utils';

describe('FindOneBankAccountById Test', () => {
  let dataSource: DataSource;
  let ormRepo: Repository<BankAccountSchema>;
  let repository: BankAccountTypeOrmRepository;
  let findOneBankAccountById: FindOneBankAccountById;

  beforeEach(async () => {
    dataSource = new DataSource(inMemoryTypeOrmConnectionConfig);
    await dataSource.initialize();
    ormRepo = dataSource.getRepository(BankAccountSchema);
    repository = new BankAccountTypeOrmRepository(ormRepo);
    findOneBankAccountById = new FindOneBankAccountById(repository);
  });

  it('should be find an bank account by id', async () => {
    const owner = new User({
      name: 'John Doe',
      email: 'john@mail.com',
    });
    const bankAccount = new BankAccount({
      id: '123',
      balance: 0,
      account_number: '1234-00',
      owner,
    });

    await repository.insert(bankAccount);

    const createdBankAccount = await findOneBankAccountById.handle(
      bankAccount.id,
    );

    expect(createdBankAccount).toBeInstanceOf(BankAccount);
    expect(createdBankAccount.id).toBe('123');
  });

  it('should throw error when bank account is not found', async () => {
    const nonExistentId = '123';

    await expect(findOneBankAccountById.handle(nonExistentId)).rejects.toThrow(
      Exception.BANK_ACCOUNT_NOT_FOUND,
    );
  });
});
