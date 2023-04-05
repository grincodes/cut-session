import { Entity } from '../../../core/domain/Entity';
import { UniqueEntityID } from '../../../core/domain/UniqueEntityID';
import { Result } from '../../../core/logic/Result';

export interface BookingProps {
  sessionId: string;
  date: string;
  userId: string;
  notes: string;
  title: string;
}

export class Booking extends Entity<BookingProps> {
  private constructor(props: BookingProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get date(): string {
    return this.props.date;
  }

  get userId(): string {
    return this.props.userId;
  }

  get sessionId(): string {
    return this.props.sessionId;
  }

  get notes(): string {
    return this.props.notes;
  }

  get title(): string {
    return this.props.title;
  }

  public static create(
    props: BookingProps,
    id?: UniqueEntityID,
  ): Result<Booking> {
    const booking = new Booking(props, id);
    return Result.ok<Booking>(booking);
  }
}
