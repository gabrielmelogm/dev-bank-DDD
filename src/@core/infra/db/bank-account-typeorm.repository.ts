import { BankAccount } from "src/@core/domain/bank-account";
import { BankAccountRepository } from "src/@core/domain/bank-account.repository";
import { BankAccountSchema } from "src/@core/infra/db/bank-account.schema";
import { Repository } from "typeorm";

export class BankAccountTypeOrmRepository implements BankAccountRepository {
  constructor(private readonly ormRepo: Repository<BankAccountSchema>) { }

  async insert(bankAccount: BankAccount): Promise<void> {
    const model = this.ormRepo.create(bankAccount)
    await this.ormRepo.insert(model)
  }

  async update(bankAccount: BankAccount): Promise<void> {
    await this.ormRepo.update(bankAccount.id, {
      balance: bankAccount.balance
    })
  }

  async findByAccountNumber(accountNumber: string): Promise<BankAccount> {
    const model = await this.ormRepo.findOneBy({
      account_number: accountNumber
    })
    return new BankAccount(model)
  }
}