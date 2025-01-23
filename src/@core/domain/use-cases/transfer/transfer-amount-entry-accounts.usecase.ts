import { BankAccount } from '../../entities/bank-account';

export class TransferAmountEntryAccountsUseCase {
  handle(
    bankAccountSrc: BankAccount,
    bankAccountDest: BankAccount,
    amount: number,
  ) {
    if (amount <= 0) {
      throw new Error('Amount must be greater than zero');
    }

    bankAccountSrc.debit(amount);
    bankAccountDest.credit(amount);
  }
}
