import {
  Controller,
  Body,
  Get,
  UseGuards,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/auth/decorators/user.decorator';
import { IJwtUser } from 'src/auth/interfaces/jtwUser';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from 'src/file/file.service';
import { SharpPipe } from 'src/file/pipe/sharp.pipe';
import { MFile } from 'src/file/class/mfile.class';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private fileService: FileService,
  ) {}

  update(@Body() updateUserDto: UpdateUserDto, @User() user: IJwtUser) {
    return this.userService.update(user.id, updateUserDto);
  }

  @Get('profile')
  profile(@User() user: IJwtUser) {
    return this.userService.profile(user.id);
  }

  @Post('change-avatar')
  @UseInterceptors(FileInterceptor('file'))
  async updateAvatar(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /^image\/(jpeg|png|gif|bmp|webp|tiff)$/i,
        })
        .addMaxSizeValidator({ maxSize: 5 * 1024 * 1024 })
        .build(),
      SharpPipe,
    )
    file: MFile,
    @User() user: IJwtUser,
  ) {
    try {
      const newFileName = await this.fileService.save(file);

      await this.userService.update(user.id, { avatar_url: newFileName });

      return { url: newFileName };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
