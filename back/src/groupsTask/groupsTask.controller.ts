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
  Param,
} from '@nestjs/common';
import { GroupsTaskService } from './groupsTask.service';
import { GroupsTaskDto } from './dto/groupsTask.dto';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { CurrentUser } from 'src/auth/decorators/user.decorators';

@Controller('user/groups-task')
export class GroupsTaskController {
  constructor(private readonly groupsTaskService: GroupsTaskService) {}

  @Get()
  @Auth()
  async getAll(@CurrentUser('id') userId: string) {
    return this.groupsTaskService.getAll(userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async create(@Body() dto: GroupsTaskDto, @CurrentUser('id') userId: string) {
    return this.groupsTaskService.create(dto, userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async update(
    @Body() dto: GroupsTaskDto,
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
  ) {
    return this.groupsTaskService.update(dto, id, userId);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string) {
    return this.groupsTaskService.delete(id);
  }
}
