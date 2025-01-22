import { BankAccountRepository } from '../../repositories/bank-account.repository';

export class FindOneBankAccountById {
  constructor(private readonly bankAccountRepo: BankAccountRepository) {}

  async handle(id: string) {
    return await this.bankAccountRepo.findOne(id);
  }
}
