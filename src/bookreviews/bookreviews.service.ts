import { Injectable } from '@nestjs/common';
import { CreateBookreviewDto } from './dto/create-bookreview.dto';
import { UpdateBookreviewDto } from './dto/update-bookreview.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookreview } from './entities/bookreview.entity';
import { Repository } from 'typeorm';
import { BookreviewsModule } from './bookreviews.module';

@Injectable()
export class BookreviewsService {
  constructor(
    @InjectRepository(Bookreview)
    private bookReviewRepository: Repository<BookreviewsModule>,
  ) {}
  create(createBookreviewDto: CreateBookreviewDto) {
    return this.bookReviewRepository.create(createBookreviewDto);
  }

  findAll() {
    return this.bookReviewRepository.find();
  }

  findOne(id: number) {
    return this.bookReviewRepository.findOneBy({
      where: { id },
    });
  }

  update(id: number, updateBookreviewDto: UpdateBookreviewDto) {
    return this.bookReviewRepository.update(id, updateBookreviewDto);
  }

  remove(id: number) {
    return this.bookReviewRepository.delete(id);
  }
}
