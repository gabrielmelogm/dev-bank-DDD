import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
} from '@nestjs/common';
import { TransferBankAccountDto } from './dto/transfer-bank-account.dto';
import { BankAccountService } from '../@core/domain/services/bank-account.service';

@Controller('bank-accounts')
export class BankAccountsController {
  constructor(
    private readonly bankAccountService: BankAccountService
  ) { }

  @Get()
  findAll() {
    return this.bankAccountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bankAccountService.findOne(id);
  }

  @HttpCode(204)
  @Post('transfer')
  transfer(@Body() transferDto: TransferBankAccountDto) {
    return this.bankAccountService.transfer(
      transferDto.from,
      transferDto.to,
      transferDto.amount,
    );
  }
}
