import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { TransferBankAccountDto } from './dto/transfer-bank-account.dto';
import { FindAllBankAccounts } from 'src/@core/domain/use-cases/bank-account/find-all-bank-accounts.usecase';
import { FindOneBankAccountById } from 'src/@core/domain/use-cases/bank-account/find-one-bank-account-by-id.usecase';
import { TransferEntryBankAccountsUseCase } from 'src/@core/domain/use-cases/bank-account/transfer-entry-bank-accounts.usecase';
import { NotFoundBankAccountFilter } from './filters/not-found-bank-account.filter';

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

  @UseFilters(NotFoundBankAccountFilter)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.findOneBankAccountById.handle(id);
  }

  @UseFilters(NotFoundBankAccountFilter)
  @Post('transfer')
  async transfer(@Body() transferDto: TransferBankAccountDto) {
    return await this.transferEntryBankAccountsUseCase.handle(
      transferDto.from,
      transferDto.to,
      transferDto.amount,
    );
  }
}
