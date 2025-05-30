import { Book } from "src/books/entities/book.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";

@Entity()
export class Author {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable: true})
    bio: string;

    @Column({nullable: true})
    birthDate: Date;

    @Column()
    isActive: true;

    @OneToMany(()=>Book, (book)=>book.author)
    @JoinColumn()
    book: Relation<Book>;


}
