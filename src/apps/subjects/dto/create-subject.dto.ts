import { IsEnum, IsInt, IsString } from 'class-validator';
import { TermType } from '../enum/term-type.enum';

export class CreateSubjectDto {
  @IsString()
  readonly name: string;

  @IsEnum(TermType)
  readonly termType: TermType;

  @IsInt()
  readonly totalHours: number;
}
