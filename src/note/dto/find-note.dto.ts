import { IsIn, IsNotEmpty } from 'class-validator';

export class FindNoteDto {
  search: string;

  @IsNotEmpty()
  categoryId: string;

  @IsIn(['date', 'name', 'rate'])
  sortBy: 'date' | 'name' | 'rate';
}
