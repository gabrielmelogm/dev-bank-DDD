import { BankAccount } from '../../entities/bank-account';
import { BankAccountRepository } from '../../repositories/bank-account.repository';
import { FindBankAccountByAccountNumberUseCase } from './find-bank-account-by-account-number.usecase';

export class UpdateBalanceBankAccountUseCase {
  constructor(
    private readonly bankAccountRepo: BankAccountRepository,
    private readonly findBankAccountByAccountNumberUseCase: FindBankAccountByAccountNumberUseCase,
  ) {}

  async handle(bankAccount: BankAccount) {
    const foundBankAccount =
      await this.findBankAccountByAccountNumberUseCase.handle(
        bankAccount.account_number,
      );
    foundBankAccount.balance = bankAccount.balance;
    await this.bankAccountRepo.update(foundBankAccount);
  }
}
