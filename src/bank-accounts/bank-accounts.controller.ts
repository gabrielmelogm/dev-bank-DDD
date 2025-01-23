import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { TransferBankAccountDto } from './dto/transfer-bank-account.dto';
import { FindAllBankAccounts } from 'src/@core/domain/use-cases/bank-account/find-all-bank-accounts.usecase';
import { FindOneBankAccountById } from 'src/@core/domain/use-cases/bank-account/find-one-bank-account-by-id.usecase';
import { TransferEntryBankAccountsUseCase } from 'src/@core/domain/use-cases/bank-account/transfer-entry-bank-accounts.usecase';
import { Response } from 'express';

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
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const response = await this.findOneBankAccountById.handle(id);
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json(
          new HttpException('Bank account not found', HttpStatus.NOT_FOUND),
        );
    }
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
