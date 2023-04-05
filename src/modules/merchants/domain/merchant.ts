import { Entity } from '../../../core/domain/Entity';
import { UniqueEntityID } from '../../../core/domain/UniqueEntityID';
import { Result } from '../../../core/logic/Result';

export interface MerchantProps {
  name: string;
  email: string;
  cityOfOperation: string;
  username: string;
  password: string;
  phoneNumber: string;
  metadata: Record<string, any>;
}

/**
 * using domain so i can define id and some domian logic
 */
export class Merchant extends Entity<MerchantProps> {
  private constructor(props: MerchantProps, id?: UniqueEntityID) {
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

  get cityOfOperation(): string {
    return this.props.cityOfOperation;
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

  public static create(
    props: MerchantProps,
    id?: UniqueEntityID,
  ): Result<Merchant> {
    const merchant = new Merchant(props, id);

    return Result.ok<Merchant>(merchant);
  }
}
