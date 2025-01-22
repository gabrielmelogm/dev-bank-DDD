import { TransferAmountEntryAccountsUseCase } from '../transfer/transfer-amount-entry-accounts.usecase';
import { FindBankAccountByAccountNumberUseCase } from './find-bank-account-by-account-number.usecase';
import { UpdateBalanceBankAccountUseCase } from './update-balance-bank-account.usecase';

export class TransferEntryBankAccountsUseCase {
  constructor(
    private readonly transferAmountEntryAccountsUseCase: TransferAmountEntryAccountsUseCase,
    private readonly findBankAccountByAccountNumberUseCase: FindBankAccountByAccountNumberUseCase,
    private readonly updateBalanceBankAccountUseCase: UpdateBalanceBankAccountUseCase,
  ) {}

  async handle(
    account_number_src: string,
    account_number_dest: string,
    amount: number,
  ) {
    const bankAccountSrc =
      await this.findBankAccountByAccountNumberUseCase.handle(
        account_number_src,
      );
    const bankAccountDest =
      await this.findBankAccountByAccountNumberUseCase.handle(
        account_number_dest,
      );

    this.transferAmountEntryAccountsUseCase.handle(
      bankAccountSrc,
      bankAccountDest,
      amount,
    );

    await this.updateBalanceBankAccountUseCase.handle(bankAccountSrc);
    await this.updateBalanceBankAccountUseCase.handle(bankAccountDest);
  }
}
