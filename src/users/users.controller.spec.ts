import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { CreateUserWithBankAccountUseCase } from 'src/@core/domain/use-cases/user/create-user-with-bank-account.usecase';
import { CreateUserDto } from './dto/create-user.dto';
import { Exception } from 'src/@core/domain/utils/error-exceptions.utils';

describe('UsersController', () => {
  let controller: UsersController;
  let createUserWithBankAccountUseCase: CreateUserWithBankAccountUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: CreateUserWithBankAccountUseCase,
          useValue: {
            handle: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    createUserWithBankAccountUseCase =
      module.get<CreateUserWithBankAccountUseCase>(
        CreateUserWithBankAccountUseCase,
      );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user with bank account', async () => {
      // Arrange
      const createUserDto: CreateUserDto = {
        // Add your DTO properties here
        name: 'John Doe',
        email: 'john@example.com',
      };
      const expectedResult = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
      };
      jest
        .spyOn(createUserWithBankAccountUseCase, 'handle')
        .mockResolvedValue(expectedResult);

      // Act
      const result = await controller.create(createUserDto);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(createUserWithBankAccountUseCase.handle).toHaveBeenCalledWith(
        createUserDto,
      );
      expect(createUserWithBankAccountUseCase.handle).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if use case fails', async () => {
      // Arrange
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
      };
      const error = new Error(Exception.FAILED_TO_CREATE_USER);
      jest
        .spyOn(createUserWithBankAccountUseCase, 'handle')
        .mockRejectedValue(error);

      // Act & Assert
      await expect(controller.create(createUserDto)).rejects.toThrow(error);
      expect(createUserWithBankAccountUseCase.handle).toHaveBeenCalledWith(
        createUserDto,
      );
      expect(createUserWithBankAccountUseCase.handle).toHaveBeenCalledTimes(1);
    });
  });
});
