import { BankAccount } from "./bank-account";
import { BankAccountRepository } from "./bank-account.repository";
import { TransferService } from "./transfer.service";

export class BankAccountService {
  constructor(private readonly bankAccountRepo: BankAccountRepository) { }

  async create(account_number: string) {
    const bankAccount = new BankAccount({
      balance: 0,
      account_number
    })
    await this.bankAccountRepo.insert(bankAccount)
    return bankAccount
  }

  async transfer(account_number_src: string, account_number_dest: string, amount: number) {
    const bankAccountSrc = await this.bankAccountRepo.findByAccountNumber(account_number_src)
    const bankAccountDest = await this.bankAccountRepo.findByAccountNumber(account_number_dest)

    const transferService = new TransferService()
    transferService.transfer(bankAccountSrc, bankAccountDest, amount)

    await this.bankAccountRepo.update(bankAccountSrc)
    await this.bankAccountRepo.update(bankAccountDest)
  }
}