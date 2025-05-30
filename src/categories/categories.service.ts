import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesModule } from './categories.module';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<CategoriesModule>,
  ) {}
  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.create(createCategoryDto);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  findOne(id: number) {
    return this.categoryRepository.findOneBy({
      where: { id },
    });
  }

  update(id: number, updateCategory: UpdateCategoryDto) {
    return this.categoryRepository.update(id, updateCategory);
  }

  remove(id: number) {
    return this.categoryRepository.delete(id);
  }
}
