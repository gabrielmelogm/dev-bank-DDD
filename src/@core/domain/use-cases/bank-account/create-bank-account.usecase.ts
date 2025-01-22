import { BankAccount } from '../../entities/bank-account';
import { User } from '../../entities/user';
import { BankAccountRepository } from '../../repositories/bank-account.repository';

export class CreateBankAccountUseCase {
  constructor(private readonly bankAccountRepo: BankAccountRepository) {}

  async handle(account_number: string, owner: User) {
    const bankAccount = new BankAccount({
      balance: 0,
      account_number,
    });
    bankAccount.addOwner(owner);
    await this.bankAccountRepo.insert(bankAccount);
    return bankAccount;
  }
}
