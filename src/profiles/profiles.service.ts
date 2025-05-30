import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfilesModule } from './profiles.module';


@Injectable()
export class ProfilesService {
  constructor(
      @InjectRepository(Profile)
      private profileRepository: Repository<ProfilesModule>
    ){}
    create(createprofileDto: CreateProfileDto) {
      return this.profileRepository.create(createprofileDto);
    }
  
    findAll() {
      return this.profileRepository.find();
    }
  
    findOne(id: number) {
      return this.profileRepository.findOneBy({
        where:{id}
      });
    }
  
    update(id: number, updateprofileDto: UpdateProfileDto) {
      return this.profileRepository.update(id, updateprofileDto);
    }
  
    remove(id: number) {
      return this.profileRepository.delete(id);
    }
}
