import { IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @Length(3)
  username: string;

  @IsEmail()
  email: string;

  @Length(8)
  password: string;
}
