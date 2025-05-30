import { faker } from '@faker-js/faker';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorsModule } from 'src/authors/authors.module';
import { Author } from 'src/authors/entities/author.entity';
import { BookreviewsModule } from 'src/bookreviews/bookreviews.module';
import { Bookreview } from 'src/bookreviews/entities/bookreview.entity';
import { BooksModule } from 'src/books/books.module';
import { Book } from 'src/books/entities/book.entity';
import { CategoriesModule } from 'src/categories/categories.module';
import { Category } from 'src/categories/entities/category.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { Admin, DataSource, Repository } from 'typeorm';

@Injectable()
export class SeedService {
    private readonly logger = new Logger();
    constructor(
        @InjectRepository(User)
       private readonly userRepository: Repository<UsersModule>,
       @InjectRepository(Profile)
       private readonly profileRepository: Repository<ProfilesModule>,
       @InjectRepository(Author)
       private readonly authorRepository: Repository<AuthorsModule>,
       @InjectRepository(Bookreview)
       private readonly bookReviewRepository: Repository<BookreviewsModule>,
       @InjectRepository(Book)
       private readonly bookRepository: Repository<BooksModule>,
       @InjectRepository(Category)
       private readonly categoryRepository: Repository<CategoriesModule>,
        
       private datasource: DataSource
    ){}

    async seed(){
        try{
            const queryRunner = this.datasource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();

            

            try{

                this.logger.log("Trying to clear tables...")

                await queryRunner.query('DELETE FROM  "user";');
                await queryRunner.query('DELETE FROM  author;');
                await queryRunner.query('DELETE FROM book;');
                await queryRunner.query('DELETE FROM profile;');
                await queryRunner.query('DELETE FROM category;');
                await queryRunner.query('DELETE FROM bookreview;');

                await queryRunner.commitTransaction();
            }catch(err){

                await queryRunner.rollbackTransaction();
                this.logger.log("An error ocurred trying to clear tables", err);
                throw err;
            }finally{
                await queryRunner.release();
            }

            this.logger.log("Seeding data to tables....")

            for(let i = 0; i < 50; i++){
                // --- Profile ---
                const profile = new Profile();
                profile.bio = faker.person.bio();
                profile.avatar = faker.system.filePath();
                profile.dateOfBirth = faker.date.birthdate();
                profile.location = faker.location.city();
                const savedProfile = await this.profileRepository.save(profile);

                // --- User ---
                const user = new User();
                user.name = faker.person.fullName();
                user.email = faker.internet.email({ firstName: user.name, provider:'email.com' });
                user.password = faker.string.sample(8);
                user.isActive = (i%2 === 0);
                user.createdAt = faker.date.soon();
                user.profile = savedProfile;
                const savedUser = await this.userRepository.save(user);

                // --- Author ---
                const author = new Author();
                author.name = faker.person.fullName();
                author.bio = faker.lorem.sentence();
                author.birthDate = faker.date.birthdate();
                author.isActive = faker.datatype.boolean();
                const savedAuthor = await this.authorRepository.save(author);

                // --- Category ---
                const category = new Category();
                category.name = faker.commerce.department();
                category.description = faker.commerce.productDescription();
                const savedCategory = await this.categoryRepository.save(category);

                // --- Book ---
                const book = new Book();
                book.title = faker.commerce.productName();
                book.description = faker.lorem.sentences(2);
                book.publicationYear = faker.date.past().toISOString();
                book.isAvailable = faker.datatype.boolean();
                book.author = savedAuthor;
                book.category = savedCategory;
                const savedBook = await this.bookRepository.save(book);

                // --- Bookreview ---
                const bookReview = new Bookreview();
                bookReview.content = faker.lorem.sentences(2);
                bookReview.rating = faker.number.int({ min: 1, max: 5 });
                bookReview.createdAt = faker.date.recent();
                bookReview.book = savedBook;
                bookReview.user = savedUser;
                await this.bookReviewRepository.save(bookReview);
            }
        
        }catch(err){
            this.logger.log("An error occured seeding data");
            throw err
        }
    }
}
