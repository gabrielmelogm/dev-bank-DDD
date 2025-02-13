import { BankAccount } from 'src/@core/domain/entities/bank-account';
import { BankAccountRepository } from 'src/@core/domain/repositories/bank-account.repository';
import { BankAccountSchema } from 'src/@core/infra/db/schemas/bank-account.schema';
import { Repository } from 'typeorm';

export class BankAccountTypeOrmRepository implements BankAccountRepository {
  constructor(private readonly ormRepo: Repository<BankAccountSchema>) {}

  async insert(bankAccount: BankAccount): Promise<void> {
    const model = this.ormRepo.create(bankAccount);
    await this.ormRepo.save(model);
  }

  async update(bankAccount: BankAccount): Promise<void> {
    await this.ormRepo.update(bankAccount.id, {
      balance: bankAccount.balance,
    });
  }

  async findAll(): Promise<BankAccount[]> {
    const bankAccounts = await this.ormRepo.find({
      relations: {
        owner: true,
      },
    });
    const modelBankAccounts: BankAccount[] = [];
    for (const bankAccount of bankAccounts) {
      modelBankAccounts.push(new BankAccount(bankAccount));
    }

    return modelBankAccounts;
  }

  async findOne(id: string): Promise<BankAccount> {
    const bankAccount = await this.ormRepo.findOne({
      where: {
        id,
      },
      relations: {
        owner: true,
      },
    });

    const modelBankAccount = new BankAccount(bankAccount);

    return modelBankAccount;
  }

  async findByAccountNumber(accountNumber: string): Promise<BankAccount> {
    const model = await this.ormRepo.findOneBy({
      account_number: accountNumber,
    });
    return new BankAccount(model);
  }
}
