import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsOptional, Max, Min } from 'class-validator';

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
}
