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
import { Roles } from '../auth/decorators/roles.decorator';
import { ROLES } from '../auth/guards/roles';

@ApiTags('Users')
@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(ROLES.ADMIN)
  @Get('/subjects')
  getUserSubjects(@Req() request: Request,) {
    const { id } = request['user'];

    return this.usersService.getUserSubjects(+id);
  }

  @Roles(ROLES.ADMIN)
  @Post(':id/add-subjects')
  async addSubjects(
    @Param('id') id: string,
    @Body() addSubjectsDto: AddSubjectsDto,
  ) {
    return this.usersService.addSubjects(+id, addSubjectsDto);
  }

  @Roles(ROLES.ADMIN)
  @Patch('/subjects')
  updateSubjects(
    @Req() request: Request,
    @Body() dto: UpdateUserSubjectsDto,
  ) {
    const { id } = request['user'];

    return this.usersService.updateSubjects(+id, dto);
  }

  @Roles(ROLES.ADMIN)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles(ROLES.ADMIN)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  findMe(@Req() request: Request) {
    const { id } = request['user'];

    return this.usersService.findById(id);
  }

  @Roles(ROLES.ADMIN)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(+id);
  }

  @Roles(ROLES.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Roles(ROLES.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
