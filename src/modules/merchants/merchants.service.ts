import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Password } from 'src/shared/password';
import { AuthRepository } from '../authentication/auth.repository';
import { AuthService } from '../authentication/auth.service';
import { ACCESS_TYPE } from '../authentication/constants';
import { Merchant } from './domain/merchant';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { MerchantMapper } from './mappers/merchantMap';
import { MerchantsRepository } from './merchants.repository';

@Injectable()
export class MerchantsService {
  constructor(
    private readonly authService: AuthService,
    private readonly merchantsRepository: MerchantsRepository,
  ) {}

  async create(createMerchantDto: CreateMerchantDto) {
    createMerchantDto.password = Password.hashPassword(
      createMerchantDto.password,
    );
    const merchantRes = Merchant.create(createMerchantDto);
    const merchant = merchantRes.getValue();
    //todo: check if merchant result is valid
    const conn = await this.merchantsRepository.getConnection();
    try {
      await this.merchantsRepository.createTransaction();

      await this.authService.createUser(
        merchant.id.toString(),
        createMerchantDto.username,
        createMerchantDto.password,
        ACCESS_TYPE.MERCHANT,
      );

      await this.merchantsRepository.create(
        MerchantMapper.toPersistence(merchant),
      );

      await conn.commit();
      return {
        merchantId: merchant.id.toString(),
      };
    } catch (err) {
      console.log(err);
      if (conn) {
        await conn.rollback(() => {
          console.log('roolback');
        });
      }

      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async fetchMerchants(offset: number, limit: number) {
    return await this.merchantsRepository.fetchMerchants(+offset - 1, limit);
  }

  findAll() {
    return this.merchantsRepository.findAll();
  }

  findOne(merchant_id: string) {
    return this.merchantsRepository.findOne(merchant_id);
  }

  update(merchant_id: string, updateMerchantDto: UpdateMerchantDto) {
    return this.merchantsRepository.update(merchant_id, updateMerchantDto);
  }
}
