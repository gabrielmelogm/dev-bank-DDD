import { GenerateBankAccountNumberUseCase } from './generate-bank-account-number.usecase';

describe('GenerateBankAccountNumberUseCase Test', () => {
  let bankAccountGenerateAccountNumberUseCase: GenerateBankAccountNumberUseCase;

  beforeEach(() => {
    bankAccountGenerateAccountNumberUseCase =
      new GenerateBankAccountNumberUseCase();
  });

  it('should generate an valid account number', () => {
    const accountNumber = bankAccountGenerateAccountNumberUseCase.handle();
    expect(accountNumber.length).toBe(7);
    expect(accountNumber.includes('-')).toBe(true);

    const numbers = accountNumber.split('-');

    expect(numbers[0].length).toBe(4);
    expect(numbers[1].length).toBe(2);
  });
});
