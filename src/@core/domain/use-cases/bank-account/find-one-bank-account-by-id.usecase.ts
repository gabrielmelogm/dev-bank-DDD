import { BankAccountRepository } from '../../repositories/bank-account.repository';

export class FindOneBankAccountById {
  constructor(private readonly bankAccountRepo: BankAccountRepository) {}

  async handle(id: string) {
    try {
      const bankAccount = await this.bankAccountRepo.findOne(id);
      return bankAccount;
    } catch (error) {
      throw new Error('Bank account not found');
    }
  }
}
