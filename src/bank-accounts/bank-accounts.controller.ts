import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TransferBankAccountDto } from './dto/transfer-bank-account.dto';
import { FindAllBankAccounts } from 'src/@core/domain/use-cases/bank-account/find-all-bank-accounts.usecase';
import { FindOneBankAccountById } from 'src/@core/domain/use-cases/bank-account/find-one-bank-account-by-id.usecase';
import { TransferEntryBankAccountsUseCase } from 'src/@core/domain/use-cases/bank-account/transfer-entry-bank-accounts.usecase';

@Controller('bank-accounts')
export class BankAccountsController {
  constructor(
    private readonly findAllBankAccounts: FindAllBankAccounts,
    private readonly findOneBankAccountById: FindOneBankAccountById,
    private readonly transferEntryBankAccountsUseCase: TransferEntryBankAccountsUseCase,
  ) {}

  @Get()
  async findAll() {
    return await this.findAllBankAccounts.handle();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.findOneBankAccountById.handle(id);
  }

  @Post('transfer')
  async transfer(@Body() transferDto: TransferBankAccountDto) {
    try {
      return await this.transferEntryBankAccountsUseCase.handle(
        transferDto.from,
        transferDto.to,
        transferDto.amount,
      );
    } catch (error) {
      return new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
