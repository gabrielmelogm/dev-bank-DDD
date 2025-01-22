import { BankAccountRepository } from '../../repositories/bank-account.repository';

export class FindBankAccountByAccountNumberUseCase {
  constructor(private readonly bankAccountRepo: BankAccountRepository) {}

  async handle(account_number: string) {
    return await this.bankAccountRepo.findByAccountNumber(account_number);
  }
}
