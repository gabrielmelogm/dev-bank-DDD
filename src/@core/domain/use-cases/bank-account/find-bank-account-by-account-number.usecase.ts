import { BankAccount } from '../../entities/bank-account';
import { BankAccountRepository } from '../../repositories/bank-account.repository';

export class FindBankAccountByAccountNumberUseCase {
  constructor(private readonly bankAccountRepo: BankAccountRepository) {}

  async handle(account_number: string): Promise<BankAccount> {
    try {
      const bankAccount = await this.bankAccountRepo.findByAccountNumber(
        account_number,
      );
      return bankAccount;
    } catch (error) {
      throw new Error('Bank account not found');
    }
  }
}
