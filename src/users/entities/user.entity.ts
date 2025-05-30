import { Bookreview } from 'src/bookreviews/entities/bookreview.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  Relation,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  
  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Relation<Profile>;

  @OneToMany(() => Bookreview, (bookReview) => bookReview.user)
  @JoinColumn()
  review: Relation<Bookreview>;
}
