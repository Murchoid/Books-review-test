import { User } from 'src/users/entities/user.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  Relation,
} from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  dateOfBirth: Date;

  @Column({ nullable: true })
  location: string;

  @OneToOne(() => User, (user) => user.profile)
  user: Relation<User>;
}
