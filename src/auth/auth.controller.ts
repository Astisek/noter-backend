import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { LoginDto } from 'src/auth/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  private readonly tokenMaxAge = 1000 * 60 * 60 * 24 * 30; // 30d

  @Post('login')
  async login(
    @Body() req: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.validateUser(req.email, req.password);
    const { access_token } = await this.authService.login(user);
    response.cookie('token', access_token, {
      httpOnly: true,
      maxAge: this.tokenMaxAge,
    });
  }

  @Post('register')
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token } = await this.authService.register(createUserDto);
    response.cookie('token', access_token, {
      httpOnly: true,
      maxAge: this.tokenMaxAge,
    });
  }
}
