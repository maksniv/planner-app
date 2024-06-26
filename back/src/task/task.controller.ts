import {
  Controller,
  Get,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Put,
  Post,
  Delete,
  Param, Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './dto/task.dto';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { CurrentUser } from 'src/auth/decorators/user.decorators';

@Controller('user/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @Auth()
  async getAll(
    @CurrentUser('id') userId: string,
    @Query('isCompleted') isCompleted: string,
    @Query('search') search: string,
    @Query('groupId') groupId: string,
  ) {
    return this.taskService.getAll(userId, isCompleted, search, groupId);
  }

  @Get(':id')
  @Auth()
  async getTaskById(
    @Param('id') id: string,
    ) {
    return this.taskService.getTaskById(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async create(
    @Body() dto: TaskDto,
    @CurrentUser('id') userId: string
  ) {
    return this.taskService.create(dto, userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async update(
    @Body() dto: TaskDto,
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
  ) {
    return this.taskService.update(dto, id, userId);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string) {
    return this.taskService.delete(id);
  }
}
