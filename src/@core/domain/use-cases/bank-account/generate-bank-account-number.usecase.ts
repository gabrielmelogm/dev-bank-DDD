export class GenerateBankAccountNumberUseCase {
  handle(): string {
    const numbers = Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * 10),
    );

    let firstVerifyNumber = numbers[0] + numbers[3];
    let secondVerifyNumber = numbers[1] + numbers[2];

    if (String(firstVerifyNumber).length > 1) {
      const newVerifyNumber = String(firstVerifyNumber).split('');
      firstVerifyNumber =
        Number.parseInt(newVerifyNumber[0]) +
        Number.parseInt(newVerifyNumber[1]);
    }

    if (String(secondVerifyNumber).length > 1) {
      const newVerifyNumber = String(secondVerifyNumber).split('');
      secondVerifyNumber =
        Number.parseInt(newVerifyNumber[0]) +
        Number.parseInt(newVerifyNumber[1]);
    }

    return `${numbers.join('')}-${firstVerifyNumber}${secondVerifyNumber}`;
  }
}
