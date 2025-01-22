import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserWithBankAccountUseCase } from 'src/@core/domain/use-cases/user/create-user-with-bank-account.usecase';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserWithBankAccountUseCase: CreateUserWithBankAccountUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.createUserWithBankAccountUseCase.handle(createUserDto);
  }
}
