import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserFinalDto {
  @Length(3)
  username: string;

  @IsEmail()
  email: string;

  @Length(8)
  password: string;

  @IsString()
  token: string;
}
