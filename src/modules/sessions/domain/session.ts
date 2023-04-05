import { differenceInMinutes, format, formatDistance, parse } from 'date-fns';
import { Entity } from '../../../core/domain/Entity';
import { UniqueEntityID } from '../../../core/domain/UniqueEntityID';
import { Result } from '../../../core/logic/Result';

export enum SESSION_TYPE {
  'WEEKDAY' = 'WeekDay',
  'WEEKEND' = 'WeekEnd',
}
export interface SessionProps {
  merchantId: string;
  startsAt: string;
  endsAt: string;
  type: SESSION_TYPE;
}

const TimeDiff = [45, 60, 90];

export class Session extends Entity<SessionProps> {
  private constructor(props: SessionProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get startsAt(): string {
    return this.props.startsAt;
  }

  get endsAt(): string {
    return this.props.endsAt;
  }

  get type(): string {
    return this.props.type;
  }

  get merchantId(): string {
    return this.props.merchantId;
  }

  public static create(
    props: SessionProps,
    id?: UniqueEntityID,
  ): Result<Session> {
    // check time diff should be 45 | 60 | 90
    // start time is 9 - 20  week day
    // 10 - 22 week end

    const endT = props.endsAt.split('Z')[0];
    const startT = props.startsAt.split('Z')[0];

    const startHr = parseInt(format(parse(startT, 'k:mm:ss', new Date()), 'k'));
    const endHr = parseInt(format(parse(endT, 'k:mm:ss', new Date()), 'k'));

    const timediff = differenceInMinutes(
      parse(endT, 'k:mm:ss', new Date()),
      parse(startT, 'k:mm:ss', new Date()),
    );

    if (TimeDiff.includes(timediff)) {
      if (props.type == 'WeekDay' && startHr >= 9 && endHr <= 20) {
        const merchant = new Session(props, id);
        return Result.ok<Session>(merchant);
      } else if (props.type == 'WeekEnd' && startHr >= 10 && endHr <= 22) {
        const merchant = new Session(props, id);
        return Result.ok<Session>(merchant);
      } else {
        return Result.fail({
          message: 'Session type doesnot correspond with time',
        });
      }
    } else {
      //invalid time slot
      return Result.fail({
        message: 'Invalid Time slot',
      });
    }
  }
}
