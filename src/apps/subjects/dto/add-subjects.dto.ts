import { IsArray, IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddSubjectsDto {
  @ApiProperty({ type: [Number], required: false })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  regularizedSubjects?: number[];

  @ApiProperty({ type: [Number], required: false })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  approvedSubjects?: number[];
}
