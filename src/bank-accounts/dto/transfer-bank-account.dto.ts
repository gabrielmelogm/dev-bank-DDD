import { IsNotEmpty, IsNumber, IsString, Matches, Min } from 'class-validator';

export class TransferBankAccountDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{4}-\d{2}$/, {
    message: 'From account must be in format: 0000-00',
  })
  from: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{4}-\d{2}$/, {
    message: 'From account must be in format: 0000-00',
  })
  to: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  amount: number;
}
