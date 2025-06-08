import { Injectable } from '@nestjs/common';
import { CreateSubjectDto, UpdateSubjectDto } from './dto';
import { PrismaService } from '../../config/prisma/prisma.service';

@Injectable()
export class SubjectsService {
  constructor(private prisma: PrismaService) {}

  create(createSubjectDto: CreateSubjectDto) {
    return this.prisma.subject.create({
      data: createSubjectDto,
    });
  }

  findAll() {
    return this.prisma.subject.findMany();
  }

  findOne(id: number) {
    return this.prisma.subject.findUnique({
      where: { id },
    });
  }

  update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return this.prisma.subject.update({
      where: { id },
      data: updateSubjectDto,
    });
  }

  remove(id: number) {
    return this.prisma.subject.delete({
      where: { id },
    });
  }
}
