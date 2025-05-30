import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Book } from 'src/books/entities/book.entity';
import { Bookreview } from 'src/bookreviews/entities/bookreview.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Author } from 'src/authors/entities/author.entity';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { AuthorsModule } from 'src/authors/authors.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { BookreviewsModule } from 'src/bookreviews/bookreviews.module';
import { BooksModule } from 'src/books/books.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([User, Book, Bookreview, Category, Profile, Author]),
    UsersModule,
    ProfilesModule,
    AuthorsModule,
    CategoriesModule,
    BookreviewsModule,
    BooksModule
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
