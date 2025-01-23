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

  it('should not be transfer an amount to other account if amount is greater than balance', () => {
    const amount = 200;

    const bankAccountSrc = new BankAccount({
      id: '123',
      account_number: '1111-11',
      balance: 100,
    });

    const bankAccountDest = new BankAccount({
      id: '321',
      account_number: '2222-22',
      balance: 50,
    });

    expect(() =>
      transferAmountEntryAccountsUseCase.handle(
        bankAccountSrc,
        bankAccountDest,
        amount,
      ),
    ).toThrowError('Insufficient balance');
  });

  it('should not be transfer an amount to other account if amount is negative or zero', () => {
    const amount = 0;

    const bankAccountSrc = new BankAccount({
      id: '123',
      account_number: '1111-11',
      balance: 100,
    });

    const bankAccountDest = new BankAccount({
      id: '321',
      account_number: '2222-22',
      balance: 50,
    });

    expect(() =>
      transferAmountEntryAccountsUseCase.handle(
        bankAccountSrc,
        bankAccountDest,
        amount,
      ),
    ).toThrowError('Amount must be greater than zero');
  });
});
