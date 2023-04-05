import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Session, SessionProps } from './domain/session';
import { CreateSessionDto } from './dto/create-session.dto';
import { SessionMapper } from './mappers/sessionMap';
import { SessionsRepo } from './session.repository';

@Injectable()
export class SessionsService {
  constructor(private sessionRepo: SessionsRepo) {}
  async create(sessionProps: SessionProps) {
    const sessionRes = Session.create(sessionProps);

    if (sessionRes.isFailure) {
      throw new HttpException(sessionRes.error, HttpStatus.CONFLICT);
    }
    const session = sessionRes.getValue();
    await this.sessionRepo.create(SessionMapper.toPersistence(session));

    return {
      sessionId: session.id.toString(),
    };
  }

  async findByMerchantId(merchantId: string) {
    if (!merchantId) {
      throw new BadRequestException();
    }
    const result = await this.sessionRepo.findOneByMerchantId(merchantId);
    const { sessionId, ...rest } = result;
    rest.id = sessionId;

    return [rest];
  }

  findAll() {
    return `This action returns all sessions`;
  }
}
