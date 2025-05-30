import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  bio: string;

  @IsDate()
  @IsOptional()
  birthDate: Date;

  @IsBoolean()
  isActive: boolean;
}
