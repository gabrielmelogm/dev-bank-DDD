import { BankAccountTypeOrmRepository } from '../../../../@core/infra/db/implements/bank-account-typeorm.repository';
import { BankAccountSchema } from '../../../../@core/infra/db/schemas/bank-account.schema';
import { DataSource, Repository } from 'typeorm';
import { User } from '../../entities/user';
import { CreateBankAccountUseCase } from './create-bank-account.usecase';
import { GenerateBankAccountNumberUseCase } from './generate-bank-account-number.usecase';
import { inMemoryTypeOrmConnectionConfig } from 'src/@core/infra/db/config/providers/inMemory-typeorm-connection.config';

describe('CreateBankAccountUseCase Test', () => {
  let dataSource: DataSource;
  let ormRepo: Repository<BankAccountSchema>;
  let repository: BankAccountTypeOrmRepository;
  let createBankAccountUseCase: CreateBankAccountUseCase;
  let generateBankAccountNumberUseCase: GenerateBankAccountNumberUseCase;

  beforeEach(async () => {
    dataSource = new DataSource(inMemoryTypeOrmConnectionConfig);
    await dataSource.initialize();
    ormRepo = dataSource.getRepository(BankAccountSchema);
    repository = new BankAccountTypeOrmRepository(ormRepo);
    createBankAccountUseCase = new CreateBankAccountUseCase(repository);
    generateBankAccountNumberUseCase = new GenerateBankAccountNumberUseCase();
  });

  it('should create a new bank account', async () => {
    const user = new User({
      name: 'John Doe',
      email: 'john@mail.com',
    });

    const generatedBankAccountNumber =
      generateBankAccountNumberUseCase.handle();

    await createBankAccountUseCase.handle(generatedBankAccountNumber, user);
    const model = await ormRepo.findOneBy({
      account_number: generatedBankAccountNumber,
    });

    expect(model.balance).toBe(0);
    expect(model.account_number).toBe(generatedBankAccountNumber);
  });
});
