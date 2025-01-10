import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Repository } from 'typeorm';
import { Note } from 'src/note/entities/note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { FindNoteDto } from 'src/note/dto/find-note.dto';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
    private categoryService: CategoryService,
  ) {}

  async create(userId: string, createNoteDto: CreateNoteDto) {
    const { categoryId, content, rate, title } = createNoteDto;
    const category = await this.categoryService.findOne(userId, categoryId);

    if (!category) {
      throw new BadRequestException();
    }

    const note = this.noteRepository.create({
      category,
      content,
      rate,
      title,
      user: {
        id: userId,
      },
    });

    await this.noteRepository.save(note);
  }

  findAll(userId: string, query: FindNoteDto) {
    const { search, sortBy, categoryId } = query;
    const queryBuilder = this.noteRepository.createQueryBuilder();

    queryBuilder.where({
      user: {
        id: userId,
      },
      category: {
        id: categoryId,
      },
    });
    if (search) {
      queryBuilder.andWhere('(LOWER(name) LIKE LOWER(:search))', {
        search: `%${search}%`,
      });
    }
    switch (sortBy) {
      case 'date':
        queryBuilder.addOrderBy('updated_at', 'DESC');
        break;
      case 'name':
        queryBuilder.addOrderBy('title', 'ASC');
        break;
      case 'rate':
        queryBuilder.addOrderBy('rate', 'DESC');
        break;
    }

    return queryBuilder.getMany();
  }

  findOne(userId: string, id: string) {
    return this.noteRepository.findOneBy({
      user: {
        id: userId,
      },
      id,
    });
  }

  async update(userId: string, id: string, updateNoteDto: UpdateNoteDto) {
    const { content, rate, title } = updateNoteDto;
    const note = await this.findOne(userId, id);
    note.content = content;
    note.rate = rate;
    note.title = title;

    return this.noteRepository.save(note);
  }

  remove(userId: string, id: string) {
    return this.noteRepository.softRemove({ user: { id: userId }, id });
  }
}
