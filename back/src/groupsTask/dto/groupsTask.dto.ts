import { IsOptional, IsString } from 'class-validator';

export class GroupsTaskDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  color: string;

  @IsOptional()
  @IsString()
  createdAt?: string;
}
