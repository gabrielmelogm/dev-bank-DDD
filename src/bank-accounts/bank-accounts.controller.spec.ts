import { Test, TestingModule } from '@nestjs/testing';
import { BankAccountsController } from './bank-accounts.controller';
import { FindAllBankAccounts } from 'src/@core/domain/use-cases/bank-account/find-all-bank-accounts.usecase';
import { FindOneBankAccountById } from 'src/@core/domain/use-cases/bank-account/find-one-bank-account-by-id.usecase';
import { TransferEntryBankAccountsUseCase } from 'src/@core/domain/use-cases/bank-account/transfer-entry-bank-accounts.usecase';
import { HttpException } from '@nestjs/common';

describe('BankAccountsController Test', () => {
  let controller: BankAccountsController;
  let findAllBankAccounts: FindAllBankAccounts;
  let findOneBankAccountById: FindOneBankAccountById;
  let transferEntryBankAccountsUseCase: TransferEntryBankAccountsUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankAccountsController],
      providers: [
        {
          provide: FindAllBankAccounts,
          useValue: {
            handle: jest.fn(),
          },
        },
        {
          provide: FindOneBankAccountById,
          useValue: {
            handle: jest.fn(),
          },
        },
        {
          provide: TransferEntryBankAccountsUseCase,
          useValue: {
            handle: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BankAccountsController>(BankAccountsController);
    findAllBankAccounts = module.get<FindAllBankAccounts>(FindAllBankAccounts);
    findOneBankAccountById = module.get<FindOneBankAccountById>(
      FindOneBankAccountById,
    );
    transferEntryBankAccountsUseCase =
      module.get<TransferEntryBankAccountsUseCase>(
        TransferEntryBankAccountsUseCase,
      );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of bank accounts', async () => {
      const result = [
        {
          id: '1',
          balance: 1000,
          account_number: '1234',
          debit: jest.fn(),
          credit: jest.fn(),
          addOwner: jest.fn(),
        },
        {
          id: '2',
          balance: 2000,
          account_number: '5678',
          debit: jest.fn(),
          credit: jest.fn(),
          addOwner: jest.fn(),
        },
      ];
      jest.spyOn(findAllBankAccounts, 'handle').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(findAllBankAccounts.handle).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single bank account', async () => {
      const result = {
        id: '1',
        balance: 1000,
        account_number: '1234',
        debit: jest.fn(),
        credit: jest.fn(),
        addOwner: jest.fn(),
      };
      jest.spyOn(findOneBankAccountById, 'handle').mockResolvedValue(result);

      const response = await controller.findOne('1');
      expect(response).toEqual(result);
      expect(findOneBankAccountById.handle).toHaveBeenCalledWith('1');
    });

    it('should throw error when bank account is not found', async () => {
      jest
        .spyOn(findOneBankAccountById, 'handle')
        .mockRejectedValue(new Error('Bank account not found'));

      await expect(controller.findOne('1')).rejects.toThrow(
        'Bank account not found',
      );
    });
  });

  describe('transfer', () => {
    const transferDto = {
      from: '1',
      to: '2',
      amount: 500,
    };

    it('should successfully transfer money between accounts', async () => {
      jest
        .spyOn(transferEntryBankAccountsUseCase, 'handle')
        .mockResolvedValue();

      await controller.transfer(transferDto);
      expect(transferEntryBankAccountsUseCase.handle).toHaveBeenCalledWith(
        transferDto.from,
        transferDto.to,
        transferDto.amount,
      );
    });

    it('should handle transfer errors', async () => {
      const errorMessage = 'Insufficient funds';
      jest
        .spyOn(transferEntryBankAccountsUseCase, 'handle')
        .mockRejectedValue(new Error(errorMessage));

      await expect(controller.transfer(transferDto)).rejects.toThrow(
        errorMessage,
      );
    });
  });
});
