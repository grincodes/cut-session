import * as bcrypt from 'bcrypt-nodejs';

export class Password {
  public static bcryptCompare(plainText: string, hashed: string): boolean {
    return bcrypt.compareSync(plainText, hashed);
  }

  public static hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
}
