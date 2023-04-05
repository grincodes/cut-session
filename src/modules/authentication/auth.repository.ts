import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Connection } from 'mysql2';
import { InjectClient } from 'nest-mysql';
import { EntityRepository } from 'src/core/infra/entity.repository';
import { Tables } from 'src/core/infra/tables';

@Injectable()
export class AuthRepository extends EntityRepository<any> {
  constructor(@InjectClient() private readonly connection: Connection) {
    super(connection, Tables.AUTH);
  }

  public async findOneByUsername(username: string): Promise<any> {
    if (!username) {
      throw new BadRequestException();
    }

    const user = await this.connection.query(
      `SELECT * FROM ${Tables.AUTH} WHERE username=? LIMIT 1`,
      [username],
    );

    if (!user) {
      throw new NotFoundException();
    }
    const result = Object.assign({}, user[0][0]);

    return result;
  }
}
