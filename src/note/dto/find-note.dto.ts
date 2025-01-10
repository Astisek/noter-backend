import { Equals } from 'class-validator';

export class FindNoteDto {
  search: string;

  @Equals(['date', 'name', 'rate'])
  sortBy: 'date' | 'name' | 'rate';
}
