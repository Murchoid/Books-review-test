import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BooksModule } from './books.module';

@Injectable()
export class BooksService {
  constructor(
      @InjectRepository(Book)
      private bookRepository: Repository<BooksModule>
    ){}
    create(createBookDto: CreateBookDto) {
      return this.bookRepository.create(createBookDto);
    }
  
    findAll() {
      return this.bookRepository.find();
    }
  
    findOne(id: number) {
      return this.bookRepository.findOneBy({
        where:{id}
      });
    }
  
    update(id: number, updateBookDto: UpdateBookDto) {
      return this.bookRepository.update(id, updateBookDto);
    }
  
    remove(id: number) {
      return this.bookRepository.delete(id);
    }
}
