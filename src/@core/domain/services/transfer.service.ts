import { BankAccount } from '../entities/bank-account';

export class TransferService {
  transfer(
    bankAccountSrc: BankAccount,
    bankAccountDest: BankAccount,
    amount: number,
  ) {
    bankAccountSrc.debit(amount);
    bankAccountDest.credit(amount);
  }
}
