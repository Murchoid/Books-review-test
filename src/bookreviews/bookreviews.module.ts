import { Module } from '@nestjs/common';
import { BookreviewsService } from './bookreviews.service';
import { BookreviewsController } from './bookreviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookreview } from './entities/bookreview.entity';

@Module({
  imports:[
    BookreviewsModule,
    TypeOrmModule.forFeature([Bookreview])
  ],
  controllers: [BookreviewsController],
  providers: [BookreviewsService],
})
export class BookreviewsModule {}
