import { ArrayNotEmpty, ArrayUnique, IsArray, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { TermType } from '../enum/term-type.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSubjectDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsInt()
  code: number;

  @ApiProperty({ enum: TermType })
  @IsEnum(TermType)
  termType: TermType;

  @ApiProperty()
  @IsInt()
  totalHours: number;

  @ApiProperty()
  @IsInt()
  annualHours: number;

  @ApiProperty()
  @IsInt()
  weeklyHours: number;

  @ApiProperty()
  @IsInt()
  courseYear: number;

  @ApiProperty({ type: [Number] })
  @IsArray()
  @ArrayNotEmpty()
  requiredSubjectsToEnroll: number[];

  @ApiProperty({ type: [Number] })
  @IsArray()
  @ArrayNotEmpty()
  requiredSubjectsToPass: number[];
}
