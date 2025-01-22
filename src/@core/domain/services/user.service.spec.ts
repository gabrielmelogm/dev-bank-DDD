import { UserTypeOrmRepository } from '../../../@core/infra/db/implements/user-typeorm.repository';
import { UserSchema } from '../../../@core/infra/db/schemas/user.schema';
import { DataSource, Repository } from 'typeorm';
import { UserService } from './user.service';
import { BankAccountService } from './bank-account.service';
import { BankAccountSchema } from '../../../@core/infra/db/schemas/bank-account.schema';
import { BankAccountTypeOrmRepository } from '../../../@core/infra/db/implements/bank-account-typeorm.repository';

describe('UserService Test', () => {
  let dataSource: DataSource;
  let ormRepo: Repository<UserSchema>;
  let bankAccountRepo: Repository<BankAccountSchema>;
  let repository: UserTypeOrmRepository;
  let bankAccountRepository: BankAccountTypeOrmRepository;
  let userService: UserService;
  let bankAccountService: BankAccountService;

  beforeEach(async () => {
    dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: false,
      entities: [UserSchema, BankAccountSchema],
    });
    await dataSource.initialize();
    ormRepo = dataSource.getRepository(UserSchema);
    bankAccountRepo = dataSource.getRepository(BankAccountSchema);
    repository = new UserTypeOrmRepository(ormRepo);
    bankAccountRepository = new BankAccountTypeOrmRepository(bankAccountRepo);
    bankAccountService = new BankAccountService(bankAccountRepository);
    userService = new UserService(repository, bankAccountService);
  });

  it('should create a new user', async () => {
    const model = await userService.create({
      name: 'John Doe',
      email: 'john@mail.com',
    });

    expect(model.name).toBe('John Doe');
    expect(model.email).toBe('john@mail.com');
  });
});
