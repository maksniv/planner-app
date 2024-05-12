import { Priority } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, IsEnum } from 'class-validator';

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

  @IsEnum(Priority)
  @IsOptional()
  @Transform(({value}) => ('' + value).toLocaleLowerCase())
  priority?: Priority
}
