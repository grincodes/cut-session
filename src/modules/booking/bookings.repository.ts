import { Injectable, NotFoundException } from '@nestjs/common';
import { Connection } from 'mysql2';
import { InjectClient } from 'nest-mysql';
import { EntityRepository } from 'src/core/infra/entity.repository';
import { Tables } from 'src/core/infra/tables';

@Injectable()
export class BookingsRepo extends EntityRepository<any> {
  constructor(@InjectClient() private connection: Connection) {
    super(connection, Tables.BOOKINGS);
  }

  public async findOneByMerchantId(merchantId: string) {
    const bookings = await this.connection.query(
      `SELECT * FROM ${Tables.BOOKINGS} WHERE merchantId=?  LIMIT 1`,
      [merchantId],
    );

    if (!bookings) {
      throw new NotFoundException();
    }
    const result = Object.assign({}, bookings[0]);

    return result;
  }

  public async fetchBookings(
    offset: number,
    limit: number,
    city: string,
    merchant?: string,
  ): Promise<any> {
    const count = await this.getTotalBookings(city, merchant);
    const bookings = await this.getBookings(offset, limit, city, merchant);
    const realCount = Object.assign({}, count[0][0]);
    return { data: bookings[0], count: realCount.count };
  }

  public async getBookings(offset, limit, city, merchant?) {
    return await this.connection.query(
      `SELECT * FROM ${Tables.MERCHANTS} LIMIT ?, ? WHERE cityOfOperation = ${city} OR name = ${merchant} OR merchantId = ${merchant}`,
      [+offset, +limit],
    );
  }
  public async getTotalBookings(city, merchant) {
    return await this.connection.query(
      `SELECT COUNT(*) AS count FROM ${Tables.MERCHANTS}
      WHERE cityOfOperation = ${city} OR name = ${merchant} OR merchantId = ${merchant}`,
    );
  }
}
