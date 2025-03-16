import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { CreateEmailDto } from 'src/auth/dto/create-email.dto';
import { CreateUserFinalDto } from 'src/auth/dto/create-user-final.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { RecaptchaEnum } from 'src/recaptcha/interfaces/recaptcha.enum';
import { RecaptchaService } from 'src/recaptcha/recaptcha.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private recaptchaService: RecaptchaService,
  ) {}

  private readonly tokenMaxAge = 1000 * 60 * 60 * 24 * 30; // 30d

  @Post('login')
  async login(
    @Body() req: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.recaptchaService.checkRecaptcha(req.token, RecaptchaEnum.Login);

    const user = await this.authService.validateUser(req.email, req.password);
    const { access_token } = await this.authService.login(user);
    response.cookie('token', access_token, {
      httpOnly: true,
      maxAge: this.tokenMaxAge,
    });
  }

  @Post('register-final')
  async createFinal(
    @Body() createUserDto: CreateUserFinalDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.recaptchaService.checkRecaptcha(
      createUserDto.token,
      RecaptchaEnum.RegisterFinal,
    );

    const { access_token } =
      await this.authService.registerFinal(createUserDto);
    response.cookie('token', access_token, {
      httpOnly: true,
      maxAge: this.tokenMaxAge,
    });
  }

  @Post('register-email')
  async createEmail(@Body() createUserDto: CreateEmailDto) {
    await this.recaptchaService.checkRecaptcha(
      createUserDto.token,
      RecaptchaEnum.RegisterEmail,
    );

    return await this.authService.registerEmail(createUserDto);
  }
}
