import { ConflictException, HttpException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { StatusResponse } from '../../common/dtos/successful-response.dto';
import { PrismaService } from '../../config/prisma/prisma.service';
import { User } from '@prisma/client';
import { hashPassword } from '../../common/utils';
import { UpdateUserSubjectsDto } from './dto/update-user-subjects.dto';
import { SubjectsDto } from '../subjects/dto/add-subjects.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger();

  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const { email } = createUserDto;

    if (await this.findByEmail( email )){
      throw new ConflictException(`User already exists`);
    }

    try {
      const hashedPassword = await hashPassword(createUserDto.password);

      const newUser = await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
        },
      });

      const { password, ...user } = newUser;

      return user;
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(
        e.response?.message ?? 'Error creating user',
        e.response?.statusCode ?? 409,
      );
    }
  }

  async findAll(): Promise<any> {
    try {
      return await this.prisma.user.findMany({ omit: { password: true }});
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(
        e.response?.message ?? 'Error fetching users',
        e.response?.statusCode ?? 409,
      );
    }
  }

  async findById(id: number): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({
        omit: { password: true },
        where: { id },
      });

      if (!user) throw new NotFoundException('User not found');

      return user;
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(
        e.response?.message ?? 'Error getting user',
        e.response?.statusCode ?? 409,
      );
    }
  }

  async findByEmail(email: string): Promise<any> {
    try {
      const user = this.prisma.user.findUnique({
        omit: { password: true },
        where: { email },
      });

      if (!user) throw new NotFoundException('User not found');

      return user;
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(
        e.response?.message ?? 'Error getting user',
        e.response?.statusCode ?? 409,
      );
    }
  }

  async findByEmailWithPassword(email: string): Promise<any> {
    try {
      const user = this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) throw new NotFoundException('User not found');

      return user;
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(
        e.response?.message ?? 'Error getting user',
        e.response?.statusCode ?? 409,
      );
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    try {
      const data: any = { ...updateUserDto };

      if (updateUserDto.password) {
        data.password = await hashPassword(updateUserDto.password);
      }

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data,
      });

      const { password, ...user } = updatedUser;
      return user;
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(
        e.response?.message ?? 'Error updating user',
        e.response?.statusCode ?? 409,
      );
    }
  }

  async remove(id: number): Promise<StatusResponse> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });

      return { ok: true, message: `User #${id} successfully deleted` };
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(
        e.response?.message ?? 'Error deleting user',
        e.response?.statusCode ?? 409,
      );
    }
  }

  async getUserSubjects(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!user) throw new NotFoundException('User not found');

      const [regularized, approved] = await Promise.all([
        this.prisma.subject.findMany({
          where: { code: { in: user.regularizedSubjects } },
        }),
        this.prisma.subject.findMany({
          where: { code: { in: user.approvedSubjects } },
        }),
      ]);

      return {
        regularizedSubjects: regularized,
        approvedSubjects: approved,
      };
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(
        e.response?.message ?? 'Error fetching user subjects',
        e.response?.statusCode ?? 409,
      );
    }
  }

  async addSubjects(userId: number, dto: SubjectsDto): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const updatedRegularized = dto.regularizedSubjects
      ? Array.from(new Set([...(user.regularizedSubjects || []), ...dto.regularizedSubjects]))
      : user.regularizedSubjects;

    const updatedApproved = dto.approvedSubjects
      ? Array.from(new Set([...(user.approvedSubjects || []), ...dto.approvedSubjects]))
      : user.approvedSubjects;

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        regularizedSubjects: updatedRegularized,
        approvedSubjects: updatedApproved,
      },
    });
  }

  async removeSubjects(userId: number, dto: SubjectsDto): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const updatedRegularized = (user.regularizedSubjects || []).filter(
      subject => !(dto.regularizedSubjects ?? []).includes(subject),
    );

    const updatedApproved = (user.approvedSubjects || []).filter(
      subject => !(dto.approvedSubjects ?? []).includes(subject),
    );

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        regularizedSubjects: updatedRegularized,
        approvedSubjects: updatedApproved,
      },
    });
  }



  async updateSubjects(id: number, dto: UpdateUserSubjectsDto): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: {
          ...(dto.regularizedSubjects && { regularizedSubjects: dto.regularizedSubjects }),
          ...(dto.approvedSubjects && { approvedSubjects: dto.approvedSubjects }),
        },
      });
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(
        e.response?.message ?? 'Error updating user subjects',
        e.response?.statusCode ?? 409,
      );
    }
  }
}
