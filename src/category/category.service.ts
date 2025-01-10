import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindCategoryDto } from 'src/category/dto/find-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(userId: string, createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto;
    const category = this.categoryRepository.create({
      name,
      user: { id: userId },
    });
    return this.categoryRepository.save(category);
  }

  async findAll(userId: string, query: FindCategoryDto) {
    const { search } = query;
    const queryBuilder = this.categoryRepository.createQueryBuilder();
    queryBuilder.where({ user: { id: userId } });
    if (search) {
      queryBuilder.andWhere('(LOWER(name) LIKE LOWER(:search))', {
        search: `%${search}%`,
      });
    }

    return queryBuilder.getMany();
  }

  findOne(userId: string, id: string) {
    return this.categoryRepository.findOneBy({
      id,
      user: {
        id: userId,
      },
    });
  }

  async update(
    userId: string,
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    const { name } = updateCategoryDto;
    const category = await this.findOne(userId, id);
    if (!category) {
      throw new NotFoundException();
    }
    category.name = name;

    return this.categoryRepository.save(category);
  }

  async remove(userId: string, id: string) {
    const category = await this.categoryRepository.findOneBy({
      id,
      user: { id: userId },
    });

    return this.categoryRepository.softRemove(category);
  }
}
