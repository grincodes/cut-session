import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Connection } from 'mysql2';
import { InjectClient } from 'nest-mysql';
import { EntityRepository } from 'src/core/infra/entity.repository';
import { Tables } from 'src/core/infra/tables';
import { User } from './domain/user';

@Injectable()
export class UsersRepository extends EntityRepository<any> {
  constructor(@InjectClient() private readonly connection: Connection) {
    super(connection, Tables.USERS);
  }

  public async findOne(userId: string): Promise<User> {
    if (!userId) {
      throw new BadRequestException();
    }

    const user = await this.connection.query(
      `SELECT * FROM ${Tables.USERS} WHERE userId=?`,
      [userId],
    );

    if (!user) {
      throw new NotFoundException();
    }
    const result = Object.assign([{}], user[0]);

    return result;
  }

  public async fetchUsers(offset: number, limit: number): Promise<any> {
    const count = await this.getTotalUsers();
    const users = await this.getUsers(offset, limit);
    const realCount = Object.assign({}, count[0][0]);
    return { data: users[0], count: realCount.count };
  }

  public async getUsers(offset, limit) {
    return await this.connection.query(
      `SELECT * FROM ${Tables.USERS} LIMIT ?, ?`,
      [+offset, +limit],
    );
  }
  public async getTotalUsers() {
    return await this.connection.query(
      `SELECT COUNT(*) AS count FROM ${Tables.USERS}`,
    );
  }
}
