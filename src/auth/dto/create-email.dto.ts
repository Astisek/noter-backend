import { IsEmail, IsString } from 'class-validator';

export class CreateEmailDto {
  @IsEmail()
  email: string;

  @IsString()
  token: string;
}
