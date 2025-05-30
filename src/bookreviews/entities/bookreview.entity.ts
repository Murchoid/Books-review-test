import { Book } from 'src/books/entities/book.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Relation,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Bookreview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  rating: number;

  @Column()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.review)
  user: Relation<User>;

  @ManyToOne(() => Book, (book) => book.review)
  book: Relation<Book>;
}
