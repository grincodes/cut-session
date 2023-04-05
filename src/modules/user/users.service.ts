import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Password } from 'src/shared/password';
import { AuthService } from '../authentication/auth.service';
import { ACCESS_TYPE } from '../authentication/constants';
import { User } from './domain/user';
import { CreateUserDto } from './dto/create-user.dto';
import { UserMapper } from './mappers/userMap';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly authService: AuthService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = Password.hashPassword(createUserDto.password);
    const userRes = User.create(createUserDto);
    const user = userRes.getValue();
    //todo: check if merchant result is valid
    const conn = await this.usersRepository.getConnection();
    try {
      await this.usersRepository.createTransaction();

      await this.authService.createUser(
        user.id.toString(),
        createUserDto.username,
        createUserDto.password,
        ACCESS_TYPE.USER,
      );

      await this.usersRepository.create(UserMapper.toPersistence(user));

      await conn.commit();
      return {
        userId: user.id.toString(),
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

  async fetchUsers(offset: number, limit: number) {
    return await this.usersRepository.fetchUsers(+offset - 1, limit);
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  findOne(userId: string) {
    return this.usersRepository.findOne(userId);
  }
}
