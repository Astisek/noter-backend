import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { CryptModule } from 'src/crypt/crypt.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IConfig } from 'src/shared/config/interfaces/config.model';
import { AuthController } from './auth.controller';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { EmailModule } from 'src/email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailCode } from 'src/auth/entities/email-code.entity';
import { RecaptchaModule } from 'src/recaptcha/recaptcha.module';

@Module({
  providers: [AuthService, JwtStrategy],
  imports: [
    UserModule,
    CryptModule,
    PassportModule,
    ConfigModule,
    RecaptchaModule,
    EmailModule,
    TypeOrmModule.forFeature([EmailCode]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<IConfig>) => {
        const { jwtSalt } = configService.get<IConfig['crypt']>('crypt');

        return {
          secret: jwtSalt,
          signOptions: { expiresIn: '30d' },
        };
      },
    }),
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
