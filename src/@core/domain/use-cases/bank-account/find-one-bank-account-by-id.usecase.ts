import { BankAccountRepository } from '../../repositories/bank-account.repository';
import { Exception } from '../../utils/error-exceptions.utils';

export class FindOneBankAccountById {
  constructor(private readonly bankAccountRepo: BankAccountRepository) {}

  async handle(id: string) {
    try {
      const bankAccount = await this.bankAccountRepo.findOne(id);
      return bankAccount;
    } catch (error) {
      throw new Error(Exception.BANK_ACCOUNT_NOT_FOUND);
    }
  }
}
