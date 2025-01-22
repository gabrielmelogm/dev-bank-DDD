import { BankAccount } from '../../entities/bank-account';

export class TransferAmountEntryAccountsUseCase {
  handle(
    bankAccountSrc: BankAccount,
    bankAccountDest: BankAccount,
    amount: number,
  ) {
    bankAccountSrc.debit(amount);
    bankAccountDest.credit(amount);
  }
}
