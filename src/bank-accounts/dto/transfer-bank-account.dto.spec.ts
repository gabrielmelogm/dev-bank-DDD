import { validate } from 'class-validator';
import { TransferBankAccountDto } from './transfer-bank-account.dto';

describe('TransferBankAccountDto Test', () => {
  let dto: TransferBankAccountDto;

  beforeEach(() => {
    dto = new TransferBankAccountDto();
  });

  it('should be valid with correct data', async () => {
    dto.from = '1234-56';
    dto.to = '7890-12';
    dto.amount = 100;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  describe('from validation', () => {
    it('should fail when from is empty', async () => {
      dto.from = '';
      dto.to = '7890-12';
      dto.amount = 100;

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('from');
    });

    it('should fail when from is undefined', async () => {
      dto.to = '7890-12';
      dto.amount = 100;

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('from');
    });

    it('should fail when from has invalid format', async () => {
      dto.from = '123456'; // missing hyphen
      dto.to = '7890-12';
      dto.amount = 100;

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('from');
    });

    it('should fail when from contains non-numeric characters', async () => {
      dto.from = '12a4-5b';
      dto.to = '7890-12';
      dto.amount = 100;

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('from');
    });
  });

  describe('to validation', () => {
    it('should fail when to is empty', async () => {
      dto.from = '1234-56';
      dto.to = '';
      dto.amount = 100;

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('to');
    });

    it('should fail when to is undefined', async () => {
      dto.from = '1234-56';
      dto.amount = 100;

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('to');
    });

    it('should fail when to has invalid format', async () => {
      dto.from = '1234-56';
      dto.to = '789012'; // missing hyphen
      dto.amount = 100;

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('to');
    });

    it('should fail when to contains non-numeric characters', async () => {
      dto.from = '1234-56';
      dto.to = '78a0-1b';
      dto.amount = 100;

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('to');
    });
  });

  describe('amount validation', () => {
    // ... existing amount validation tests ...
    // Update the from and to values in each test to use the correct format:
    it('should fail when amount is zero', async () => {
      dto.from = '1234-56';
      dto.to = '7890-12';
      dto.amount = 0;

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('amount');
    });

    it('should fail when amount is negative', async () => {
      dto.from = '1234-56';
      dto.to = '7890-12';
      dto.amount = -10;

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('amount');
    });

    it('should fail when amount is not a number', async () => {
      dto.from = '1234-56';
      dto.to = '7890-12';
      dto.amount = 'invalid' as any;

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('amount');
    });

    it('should pass when amount is greater than 0.01', async () => {
      dto.from = '1234-56';
      dto.to = '7890-12';
      dto.amount = 0.02;

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });
  });
});
