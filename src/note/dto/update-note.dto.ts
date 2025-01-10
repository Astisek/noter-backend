import { OmitType } from '@nestjs/mapped-types';
import { CreateNoteDto } from './create-note.dto';

export class UpdateNoteDto extends OmitType(CreateNoteDto, ['categoryId']) {}
