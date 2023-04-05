import { HttpException, HttpStatus } from '@nestjs/common';
import { Connection } from 'mysql2';

export abstract class EntityRepository<T> {
  constructor(
    protected readonly entityModel: Connection,
    private tbl: string,
  ) {}

  async findAll(): Promise<any | null> {
    const all = await this.entityModel.query(`SELECT * FROM ${this.tbl}`);
    // const results = Object.assign([{}], all[0]);
    return all[0];
  }

  async create(createEntityData: Record<string, any>): Promise<any> {
    console.log(createEntityData);

    const objKeys = Object.keys(createEntityData);
    const fields = objKeys.join();
    const valueString = objKeys.fill('?');
    const objVals = Object.values(createEntityData);
    console.log(
      `INSERT INTO ${this.tbl} (${fields})  VALUES (${valueString})`,
      [...objVals],
    );

    try {
      const entity = await this.entityModel.query(
        `INSERT INTO ${this.tbl} (${fields})  VALUES (${valueString})`,
        [...objVals],
      );
      return entity;
    } catch (err) {
      if (err.code == 'ER_DUP_ENTRY') {
        const errMsg = err.message.split("'");
        throw new HttpException(
          {
            message: `${errMsg[1]} already exist`,
          },
          HttpStatus.CONFLICT,
        );
      } else {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async createTransaction() {
    return this.entityModel.beginTransaction(function (err) {
      throw err;
    });
  }

  async getConnection() {
    return this.entityModel;
  }
}
