import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsOptional } from 'class-validator';

export class UpdateUserSubjectsDto {
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
