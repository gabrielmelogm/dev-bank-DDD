import { User } from '../../entities/user';
import { UserRepository } from '../../repositories/user.repository';
import { CreateBankAccountUseCase } from '../bank-account/create-bank-account.usecase';
import { GenerateBankAccountNumberUseCase } from '../bank-account/generate-bank-account-number.usecase';

export class CreateUserWithBankAccountUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly createBankAccountUseCase: CreateBankAccountUseCase,
    private readonly generateBankAccountNumberUseCase: GenerateBankAccountNumberUseCase,
  ) {}

  async handle(user: { name: string; email: string }) {
    const newUser = new User({
      name: user.name,
      email: user.email,
    });

    const createdUser = await this.userRepo.create(newUser);

    await this.createBankAccountUseCase.handle(
      this.generateBankAccountNumberUseCase.handle(),
      createdUser,
    );

    return createdUser;
  }
}
