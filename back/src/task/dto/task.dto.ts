import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class TaskDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  taskGroupId: string;

  @IsOptional()
  @IsBoolean()
  isCompleted: boolean;

  @IsOptional()
  @IsString()
  deadlines: string;

  @IsOptional()
  @IsString()
  createdAt: string;
}
