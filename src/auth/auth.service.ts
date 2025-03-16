import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmailDto } from 'src/auth/dto/create-email.dto';
import { CreateUserFinalDto } from 'src/auth/dto/create-user-final.dto';
import { EmailCode } from 'src/auth/entities/email-code.entity';
import { codeGenerator } from 'src/auth/utils/codeGenerator';
import { CryptService } from 'src/crypt/crypt.service';
import { EmailService } from 'src/email/email.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private cryptService: CryptService,
    private jwtService: JwtService,
    private emailService: EmailService,
    @InjectRepository(EmailCode)
    private emailCodeRepository: Repository<EmailCode>,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    const isCorrectPass = await this.cryptService.compare(
      pass,
      user?.password || '',
    );
    if (!isCorrectPass || !user) {
      throw new BadRequestException('Invalid email or password.');
    }

    return user;
  }

  async login(user: User) {
    const payload = { id: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registerEmail(createEmailDto: CreateEmailDto) {
    const { email } = createEmailDto;
    const prevCode = await this.emailCodeRepository.findOneBy({ email });

    if (prevCode) {
      await this.emailCodeRepository.softDelete({ id: prevCode.id });
    }
    await this.checkExistUser(email);

    const code = codeGenerator();
    await this.emailService.sendCode(email, code);
    const emailCode = this.emailCodeRepository.create({
      code,
      email,
    });
    await this.emailCodeRepository.save(emailCode);
  }

  async registerFinal(createUserDto: CreateUserFinalDto) {
    const { email, code, password } = createUserDto;

    await this.checkExistUser(email);

    const emailCode = await this.emailCodeRepository.findOneBy({ email });
    if (emailCode?.code !== code) {
      throw new BadRequestException('Invalid code');
    }

    await this.emailCodeRepository.softRemove(emailCode);

    const hashPass = await this.cryptService.createHash(password);
    const user = await this.usersService.create({
      ...createUserDto,
      password: hashPass,
    });

    return this.login(user);
  }

  async checkExistUser(email: string) {
    const existUser = await this.usersService.findOne(email);

    if (existUser) {
      throw new BadRequestException('This email is already registered');
    }
  }
}
