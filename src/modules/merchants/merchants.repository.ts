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
import { Merchant } from './domain/merchant';
import { UpdateMerchantDto } from './dto/update-merchant.dto';

@Injectable()
export class MerchantsRepository extends EntityRepository<any> {
  constructor(@InjectClient() private readonly connection: Connection) {
    super(connection, Tables.MERCHANTS);
  }

  public async findOne(merchantId: string): Promise<Merchant> {
    if (!merchantId) {
      throw new BadRequestException();
    }

    const merchant = await this.connection.query(
      `SELECT * FROM ${Tables.MERCHANTS} WHERE merchantId=?`,
      [merchantId],
    );

    if (!merchant) {
      throw new NotFoundException();
    }
    const result = Object.assign([{}], merchant[0]);

    return result;
  }

  public async fetchMerchants(offset: number, limit: number): Promise<any> {
    const count = await this.getTotalMerchants();
    const merchants = await this.getMerchants(offset, limit);
    const realCount = Object.assign({}, count[0][0]);
    return { data: merchants[0], count: realCount.count };
  }

  public async getMerchants(offset, limit) {
    return await this.connection.query(
      `SELECT * FROM ${Tables.MERCHANTS} LIMIT ?, ?`,
      [+offset, +limit],
    );
  }
  public async getTotalMerchants() {
    return await this.connection.query(
      `SELECT COUNT(*) AS count FROM ${Tables.MERCHANTS}`,
    );
  }

  public async update(
    merchantId: string,
    updateMerchantDto: UpdateMerchantDto,
  ): Promise<any> {
    try {
      const { name, email, phoneNumber } = updateMerchantDto;

      const merchant = await this.connection.query(
        'UPDATE users SET name=?, email=?, cityOfOperation=?,phoneNumber=? WHERE merchantId=?',
        [name, email, phoneNumber, merchantId],
      );
      return merchant;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
