import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from 'src/note/entities/note.entity';
import { CategoryModule } from 'src/category/category.module';

@Module({
  controllers: [NoteController],
  providers: [NoteService],
  imports: [TypeOrmModule.forFeature([Note]), CategoryModule],
})
export class NoteModule {}
