import { OmitType } from '@nestjs/mapped-types';
import { CreateNoteDto } from './create-note.dto';
import { IsOptional, Max, Min } from 'class-validator';

export class UpdateNoteDto extends OmitType(CreateNoteDto, ['categoryId']) {
  @IsOptional()
  content: string;

  @Min(1)
  @Max(10)
  @IsOptional()
  rate: number;

  @IsOptional()
  title: string;
}
