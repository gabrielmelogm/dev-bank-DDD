import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateBankAccountDto {
  @IsNotEmpty({ message: 'Account number is required' })
  @IsString({ message: 'Account number must be a string' })
  @Length(7, 7, { message: 'Account number must be 7 characters long' })
  account_number: string;
}
