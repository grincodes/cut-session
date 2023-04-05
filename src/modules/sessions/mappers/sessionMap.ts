import { Mapper } from 'src/core/infra/mapper';
import { Session } from '../domain/session';

export class SessionMapper extends Mapper<Session> {
  public static toPersistence(session: Session) {
    return {
      sessionId: session.id.toString(),
      startsAt: session.startsAt,
      endsAt: session.endsAt,
      type: session.type,
      merchantId: session.merchantId,
    };
  }
}
