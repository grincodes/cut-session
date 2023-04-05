import { Entity } from '../../../core/domain/Entity';
import { UniqueEntityID } from '../../../core/domain/UniqueEntityID';
import { Result } from '../../../core/logic/Result';

export interface UserProps {
  name: string;
  email: string;
  dob: string;
  cityOfResidence: string;
  username: string;
  password: string;
  phoneNumber: string;
  metadata: Record<string, any>;
}

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get cityOfResidence(): string {
    return this.props.cityOfResidence;
  }

  get dob(): string {
    return this.props.dob;
  }

  get username(): string {
    return this.props.username;
  }

  get password(): string {
    return this.props.password;
  }

  get phoneNumber(): string {
    return this.props.phoneNumber;
  }

  get metadata(): string {
    return JSON.stringify(this.props.metadata);
  }

  public static create(props: UserProps, id?: UniqueEntityID): Result<User> {
    const user = new User(props, id);

    return Result.ok<User>(user);
  }
}
