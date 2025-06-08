import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, UseGuards, Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiTags } from '@nestjs/swagger';
import { request } from 'express';
import { UpdateUserSubjectsDto } from './dto/update-user-subjects.dto';
import { AddSubjectsDto } from '../subjects/dto/add-subjects.dto';

@ApiTags('Users')
@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/subjects')
  getUserSubjects(@Req() request: Request,) {
    const { id } = request['user'];

    return this.usersService.getUserSubjects(+id);
  }

  @Post(':id/add-subjects')
  async addSubjects(
    @Param('id') id: string,
    @Body() addSubjectsDto: AddSubjectsDto,
  ) {
    return this.usersService.addSubjects(+id, addSubjectsDto);
  }

  @Patch('/subjects')
  updateSubjects(
    @Req() request: Request,
    @Body() dto: UpdateUserSubjectsDto,
  ) {
    const { id } = request['user'];

    return this.usersService.updateSubjects(+id, dto);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  findMe(@Req() request: Request) {
    const { id } = request['user'];

    return this.usersService.findById(id);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
