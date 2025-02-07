import { OmitType } from '@nestjs/mapped-types';
import { CreateNoteDto } from './create-note.dto';
import { IsNotEmpty, Max, Min } from 'class-validator';

export class UpdateNoteDto extends OmitType(CreateNoteDto, ['categoryId']) {
  @IsNotEmpty()
  content: string;

  @Min(1)
  @Max(10)
  rate: number;
}
