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
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserSubjectsDto } from './dto/update-user-subjects.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { ROLES } from '../auth/guards/roles';
import { SubjectsDto } from '../subjects/dto/add-subjects.dto';

@ApiTags('Users')
@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(ROLES.USER)
  @Get('/subjects')
  getUserSubjects(@Req() request: Request,) {
    const { id } = request['user'];

    return this.usersService.getUserSubjects(+id);
  }

  @Roles(ROLES.USER)
  @Post('/add-subjects')
  async addSubjects(
    @Req() request: Request,
    @Body() addSubjectsDto: SubjectsDto,
  ) {
    const { id } = request['user'];

    return this.usersService.addSubjects(+id, addSubjectsDto);
  }

  @Roles(ROLES.USER)
  @Post('/remove-subjects')
  async removeSubjects(
    @Req() request: Request,
    @Body() removeSubjectsDto: SubjectsDto,
  ) {
    const { id } = request['user'];

    return this.usersService.removeSubjects(+id, removeSubjectsDto);
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
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Roles(ROLES.USER)
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
  update(@Req() request: Request, @Body() updateUserDto: UpdateUserDto) {
    const { id } = request['user'];

    return this.usersService.update(+id, updateUserDto);
  }

  @Roles(ROLES.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
