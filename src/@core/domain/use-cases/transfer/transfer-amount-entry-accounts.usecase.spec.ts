import { BankAccount } from '../../entities/bank-account';
import { TransferAmountEntryAccountsUseCase } from './transfer-amount-entry-accounts.usecase';

describe('TransferAmountEntryAccountsUseCase Test', () => {
  let transferAmountEntryAccountsUseCase: TransferAmountEntryAccountsUseCase;

  beforeEach(() => {
    transferAmountEntryAccountsUseCase =
      new TransferAmountEntryAccountsUseCase();
  });

  it('should be transfer an amount to other account', () => {
    const amount = 50;

    const bankAccountSrc = new BankAccount({
      id: '123',
      account_number: '1111-11',
      balance: 200,
    });

    const bankAccountDest = new BankAccount({
      id: '321',
      account_number: '2222-22',
      balance: 50,
    });

    transferAmountEntryAccountsUseCase.handle(
      bankAccountSrc,
      bankAccountDest,
      amount,
    );

    expect(bankAccountSrc.balance).toBe(150);
    expect(bankAccountDest.balance).toBe(100);
  });
});
