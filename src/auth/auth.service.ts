import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { CryptService } from 'src/crypt/crypt.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private cryptService: CryptService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    const isCorrectPass = await this.cryptService.compare(pass, user?.password);
    if (!isCorrectPass || !user) {
      return new UnauthorizedException();
    }

    return user;
  }

  async login(user: User) {
    const payload = { id: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    const hashPass = await this.cryptService.createHash(createUserDto.password);

    return this.usersService.create({ ...createUserDto, password: hashPass });
  }
}
