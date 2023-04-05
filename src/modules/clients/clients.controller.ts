import { Controller, Get, Param, Query } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientQueryParams } from './dto/client-query-params-dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  async fetchClients(@Query() Qparams: ClientQueryParams) {
    return this.clientsService.fetchClients(Qparams);
  }
}
