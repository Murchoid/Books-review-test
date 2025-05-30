import { Author } from 'src/authors/entities/author.entity';
import { Bookreview } from 'src/bookreviews/entities/bookreview.entity';
import { Category } from 'src/categories/entities/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  publicationYear: Date;

  @Column({ default: true })
  isAvailable: boolean;

  @OneToMany(() => Bookreview, (bookReview) => bookReview.book)
  @JoinColumn()
  review: Relation<Bookreview>;

  @ManyToOne(() => Author, (author) => author.book)
  author: Relation<Author>;

  @ManyToMany(() => Category, (category) => category.book)
  category: Relation<Category>;
}
