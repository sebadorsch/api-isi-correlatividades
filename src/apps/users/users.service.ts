import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { StatusResponse } from '../../common/dtos/successful-response.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll(): StatusResponse {
    return { ok: true, message: `This action returns all users` };
  }

  findOne(id: number): StatusResponse {
    return { ok: true, message: `This action returns a #${id} user` };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return { ok: true, message: `This action updates a #${id} user` };
  }

  remove(id: number) {
    return { ok: true, message: `This action removes a #${id} user` };
  }
}
