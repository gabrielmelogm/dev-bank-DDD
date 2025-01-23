import { UserTypeOrmRepository } from '../../../infra/db/implements/user-typeorm.repository';
import { UserSchema } from '../../../infra/db/schemas/user.schema';
import { DataSource, Repository } from 'typeorm';
import { CreateUserWithBankAccountUseCase } from './create-user-with-bank-account.usecase';
import { CreateBankAccountUseCase } from '../bank-account/create-bank-account.usecase';
import { BankAccountSchema } from '../../../infra/db/schemas/bank-account.schema';
import { BankAccountTypeOrmRepository } from '../../../infra/db/implements/bank-account-typeorm.repository';
import { GenerateBankAccountNumberUseCase } from '../bank-account/generate-bank-account-number.usecase';
import { User } from '../../entities/user';
import { BankAccount } from '../../entities/bank-account';
import { inMemoryTypeOrmConnectionConfig } from 'src/@core/infra/db/config/providers/inMemory-typeorm-connection.config';

describe('CreateUserWithBankAccountUseCase Test', () => {
  let dataSource: DataSource;

  let ormRepo: Repository<UserSchema>;
  let repository: UserTypeOrmRepository;

  let bankAccountRepo: Repository<BankAccountSchema>;
  let bankAccountRepository: BankAccountTypeOrmRepository;

  let createBankAccountUseCase: CreateBankAccountUseCase;

  let generateBankAccountNumberUseCase: GenerateBankAccountNumberUseCase;

  let createUserWithBankAccountUseCase: CreateUserWithBankAccountUseCase;

  beforeEach(async () => {
    dataSource = new DataSource(inMemoryTypeOrmConnectionConfig);
    await dataSource.initialize();

    ormRepo = dataSource.getRepository(UserSchema);
    repository = new UserTypeOrmRepository(ormRepo);

    bankAccountRepo = dataSource.getRepository(BankAccountSchema);
    bankAccountRepository = new BankAccountTypeOrmRepository(bankAccountRepo);

    createBankAccountUseCase = new CreateBankAccountUseCase(
      bankAccountRepository,
    );

    generateBankAccountNumberUseCase = new GenerateBankAccountNumberUseCase();

    createUserWithBankAccountUseCase = new CreateUserWithBankAccountUseCase(
      repository,
      createBankAccountUseCase,
      generateBankAccountNumberUseCase,
    );
  });

  it('should create a new user', async () => {
    const createdUser = await createUserWithBankAccountUseCase.handle({
      name: 'John Doe',
      email: 'john@mail.com',
    });

    expect(createdUser).toBeInstanceOf(User);
  });

  it('should create a new user with an bank account', async () => {
    const createdUser = await createUserWithBankAccountUseCase.handle({
      name: 'John Doe',
      email: 'john@mail.com',
    });

    expect(createdUser).toBeInstanceOf(User);

    const createdBankAccount = await createBankAccountUseCase.handle(
      generateBankAccountNumberUseCase.handle(),
      createdUser,
    );

    expect(createdBankAccount).toBeInstanceOf(BankAccount);
    expect(createdBankAccount.owner).toBeInstanceOf(User);
  });
});
