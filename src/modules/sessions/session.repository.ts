import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Connection } from 'mysql2';
import { InjectClient } from 'nest-mysql';
import { EntityRepository } from 'src/core/infra/entity.repository';
import { Tables } from 'src/core/infra/tables';
import { Session } from './domain/session';

@Injectable()
export class SessionsRepo extends EntityRepository<any> {
  constructor(@InjectClient() private connection: Connection) {
    super(connection, Tables.SESSIONS);
  }

  public async findOneByMerchantId(merchantId: string) {
    const session = await this.connection.query(
      `SELECT * FROM ${Tables.SESSIONS} WHERE merchantId=? LIMIT 1`,
      [merchantId],
    );

    if (!session) {
      throw new NotFoundException();
    }
    const result = Object.assign({}, session[0][0]);

    return result;
  }
}
