import * as bcrypt from 'bcrypt';

export class Crypt {
  static async genHash(value: string): Promise<string> {
    const numberSalt = 12;
    const salt: string = await bcrypt.genSalt(numberSalt);
    const hash: string = await bcrypt.hash(value, salt);

    return hash;
  }
}
