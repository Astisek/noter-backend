import { Controller, Body, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/auth/decorators/user.decorator';
import { IJwtUser } from 'src/auth/interfaces/jtwUser';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  update(@Body() updateUserDto: UpdateUserDto, @User() user: IJwtUser) {
    return this.userService.update(user.id, updateUserDto);
  }

  @Get('profile')
  profile(@User() user: IJwtUser) {
    return this.userService.profile(user.id);
  }
}
