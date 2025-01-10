import { IsNotEmpty, Max, Min } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  title: string;

  @Min(1)
  @Max(10)
  rate: number;

  @IsNotEmpty()
  categoryId: string;
}
