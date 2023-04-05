import { Mapper } from 'src/core/infra/mapper';
import { User } from '../domain/user';

export class UserMapper extends Mapper<User> {
  public static toPersistence(user: User) {
    return {
      userId: user.id.toString(),
      name: user.name,
      email: user.email,
      dob: user.dob,
      cityOfResidence: user.cityOfResidence,
      phoneNumber: user.phoneNumber,
      metadata: user.metadata,
    };
  }
}
