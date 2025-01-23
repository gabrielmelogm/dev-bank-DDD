import { BankAccount } from '../../entities/bank-account';
import { Exception } from '../../utils/error-exceptions.utils';

export class TransferAmountEntryAccountsUseCase {
  handle(
    bankAccountSrc: BankAccount,
    bankAccountDest: BankAccount,
    amount: number,
  ) {
    if (amount <= 0) {
      throw new Error(Exception.AMOUNT_MUST_BE_GREATER_THAN_ZERO);
    }

    bankAccountSrc.debit(amount);
    bankAccountDest.credit(amount);
  }
}
