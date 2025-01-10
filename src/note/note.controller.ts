import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/auth/decorators/user.decorator';
import { IJwtUser } from 'src/auth/interfaces/jtwUser';
import { FindNoteDto } from 'src/note/dto/find-note.dto';

@Controller('note')
@UseGuards(JwtAuthGuard)
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  create(@User() user: IJwtUser, @Body() createNoteDto: CreateNoteDto) {
    return this.noteService.create(user.id, createNoteDto);
  }

  @Get()
  findAll(@User() user: IJwtUser, @Query() query: FindNoteDto) {
    return this.noteService.findAll(user.id, query);
  }

  @Put(':id')
  update(
    @User() user: IJwtUser,
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    return this.noteService.update(user.id, id, updateNoteDto);
  }

  @Delete(':id')
  remove(@User() user: IJwtUser, @Param('id') id: string) {
    return this.noteService.remove(user.id, id);
  }
}
