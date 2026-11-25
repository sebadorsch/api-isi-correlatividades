import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize, IsArray, IsIn, IsInt, IsOptional, IsString, Length, Max, Min, ValidateNested,
} from 'class-validator';

export const ELECTIVE_STATES = ['regular', 'aprobada'] as const;

export class ElectiveDto {
  @ApiProperty({ example: 'k3j9x2' })
  @IsString()
  @Length(1, 40)
  id: string;

  @ApiProperty({ example: 'Metodologías Ágiles' })
  @IsString()
  @Length(1, 100)
  name: string;

  @ApiProperty({ enum: [3, 4, 5] })
  @IsIn([3, 4, 5])
  level: number;

  @ApiProperty({ description: 'Horas semanales', minimum: 1, maximum: 60 })
  @IsInt()
  @Min(1)
  @Max(60)
  hours: number;

  @ApiProperty({ enum: ELECTIVE_STATES })
  @IsIn(ELECTIVE_STATES)
  state: (typeof ELECTIVE_STATES)[number];
}

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

  @ApiProperty({ required: false, description: 'Horas semanales de electivas aprobadas en 3º nivel' })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(60)
  electiveHoursLevel3?: number;

  @ApiProperty({ required: false, description: 'Horas semanales de electivas aprobadas en 4º nivel' })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(60)
  electiveHoursLevel4?: number;

  @ApiProperty({ required: false, description: 'Horas semanales de electivas aprobadas en 5º nivel' })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(60)
  electiveHoursLevel5?: number;

  @ApiProperty({ type: [ElectiveDto], required: false })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(40)
  @ValidateNested({ each: true })
  @Type(() => ElectiveDto)
  electives?: ElectiveDto[];
}
