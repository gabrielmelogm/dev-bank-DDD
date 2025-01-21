import { BankAccount } from "../entities/bank-account";
import { User } from "../entities/user";
import { BankAccountRepository } from "../repositories/bank-account.repository";
import { TransferService } from "./transfer.service";

export class BankAccountService {
  constructor(private readonly bankAccountRepo: BankAccountRepository) { }

  async create(account_number: string, owner: User) {
    const bankAccount = new BankAccount({
      balance: 0,
      account_number,
    })
    bankAccount.addOwner(owner)
    await this.bankAccountRepo.insert(bankAccount)
    return bankAccount
  }

  async findAll() {
    return await this.bankAccountRepo.findAll()
  }

  async findOne(id: string) {
    return await this.bankAccountRepo.findOne(id)
  }

  async transfer(account_number_src: string, account_number_dest: string, amount: number) {
    const bankAccountSrc = await this.bankAccountRepo.findByAccountNumber(account_number_src)
    const bankAccountDest = await this.bankAccountRepo.findByAccountNumber(account_number_dest)

    const transferService = new TransferService()
    transferService.transfer(bankAccountSrc, bankAccountDest, amount)

    await this.bankAccountRepo.update(bankAccountSrc)
    await this.bankAccountRepo.update(bankAccountDest)
  }

  generateAccountNumber(): string {
    const numbers = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10))

    let firstVerifyNumber = numbers[0] + numbers[3]
    let secondVerifyNumber = numbers[1] + numbers[2]

    if (String(firstVerifyNumber).length > 1) {
      let newVerifyNumber = String(firstVerifyNumber).split('')
      firstVerifyNumber = Number.parseInt(newVerifyNumber[0]) + Number.parseInt(newVerifyNumber[1])
    }

    if (String(secondVerifyNumber).length > 1) {
      let newVerifyNumber = String(secondVerifyNumber).split('')
      secondVerifyNumber = Number.parseInt(newVerifyNumber[0]) + Number.parseInt(newVerifyNumber[1])
    }

    return `${numbers.join('')}-${firstVerifyNumber}${secondVerifyNumber}`
  }
}