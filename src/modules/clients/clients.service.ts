import { Injectable } from '@nestjs/common';
import { MerchantsService } from '../merchants/merchants.service';
import { UsersService } from '../user/users.service';
import { ClientQueryParams } from './dto/client-query-params-dto';

@Injectable()
export class ClientsService {
  constructor(
    private readonly merchantsService: MerchantsService,
    private readonly usersService: UsersService,
  ) {}

  async fetchClients(clientParams: ClientQueryParams) {
    if (clientParams.type == 'MERCHANT') {
      //merchant

      return this.merchantsService.fetchMerchants(
        clientParams.offset,
        clientParams.limit,
      );
    } else {
      // user

      return this.usersService.fetchUsers(
        clientParams.offset,
        clientParams.limit,
      );
    }
  }
}
