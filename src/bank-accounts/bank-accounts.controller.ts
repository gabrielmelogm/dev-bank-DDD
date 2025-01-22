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
import { BankAccountService } from '../@core/domain/services/bank-account.service';

@Controller('bank-accounts')
export class BankAccountsController {
  constructor(private readonly bankAccountService: BankAccountService) {}

  @Get()
  async findAll() {
    return await this.bankAccountService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.bankAccountService.findOne(id);
  }

  @Post('transfer')
  async transfer(@Body() transferDto: TransferBankAccountDto) {
    try {
      return await this.bankAccountService.transfer(
        transferDto.from,
        transferDto.to,
        transferDto.amount,
      );
    } catch (error) {
      return new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
