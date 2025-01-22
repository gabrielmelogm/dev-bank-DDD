import { BankAccountRepository } from '../../repositories/bank-account.repository';

export class FindAllBankAccounts {
  constructor(private readonly bankAccountRepo: BankAccountRepository) {}

  async handle() {
    return await this.bankAccountRepo.findAll();
  }
}
