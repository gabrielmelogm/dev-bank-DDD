import { validate } from 'class-validator';
import { CreateBankAccountDto } from './create-bank-account.dto';

describe('CreateBankAccountDto Test', () => {
  it('should create a valid DTO with account_number', async () => {
    const dto = new CreateBankAccountDto();
    dto.account_number = '1234-56';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail when account_number is not provided', async () => {
    const dto = new CreateBankAccountDto();

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail when account_number is empty', async () => {
    const dto = new CreateBankAccountDto();
    dto.account_number = '';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail when account_number length is greater than 7', async () => {
    const dto = new CreateBankAccountDto();
    dto.account_number = '1234-567';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
