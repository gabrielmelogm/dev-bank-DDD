import { validate } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

describe('CreateUserDto Test', () => {
  let dto: CreateUserDto;

  beforeEach(() => {
    dto = new CreateUserDto();
  });

  it('should be defined', () => {
    expect(dto).toBeDefined();
  });

  describe('name validation', () => {
    it('should validate with a valid name', async () => {
      dto.name = 'John Doe';
      dto.email = 'john@example.com';
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should fail when name is empty', async () => {
      dto.name = '';
      dto.email = 'john@example.com';
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });

    it('should fail when name is not a string', async () => {
      dto.name = 123 as any;
      dto.email = 'john@example.com';
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('isString');
    });
  });

  describe('email validation', () => {
    it('should validate with a valid email', async () => {
      dto.name = 'John Doe';
      dto.email = 'john@example.com';
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should fail when email is empty', async () => {
      dto.name = 'John Doe';
      dto.email = '';
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });

    it('should fail when email format is invalid', async () => {
      dto.name = 'John Doe';
      dto.email = 'invalid-email';
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('isEmail');
    });
  });
});