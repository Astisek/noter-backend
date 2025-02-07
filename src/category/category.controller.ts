import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/auth/decorators/user.decorator';
import { IJwtUser } from 'src/auth/interfaces/jtwUser';
import { FindCategoryDto } from 'src/category/dto/find-category.dto';

@Controller('category')
@UseGuards(JwtAuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto, @User() user: IJwtUser) {
    return this.categoryService.create(user.id, createCategoryDto);
  }

  @Get()
  findAll(@User() user: IJwtUser, @Query() query: FindCategoryDto) {
    return this.categoryService.findAll(user.id, query);
  }

  @Get(':id')
  findOne(@User() user: IJwtUser, @Param('id') id: string) {
    return this.categoryService.findOne(user.id, id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @User() user: IJwtUser,
  ) {
    return this.categoryService.update(user.id, id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IJwtUser) {
    try {
      return this.categoryService.remove(user.id, id);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
