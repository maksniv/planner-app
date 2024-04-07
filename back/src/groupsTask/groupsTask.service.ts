import { Injectable } from '@nestjs/common';
import { GroupsTaskDto } from './dto/groupsTask.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GroupsTaskService {
  constructor(private prisma: PrismaService) {}

  async getAll(userId: string) {
    return this.prisma.taskGroup.findMany({
      where: {
        userId,
      },
    });
  }

  async create(dto: GroupsTaskDto, userId: string) {
    return this.prisma.taskGroup.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async update(
    dto: Partial<GroupsTaskDto>,
    taskGroupId: string,
    userId: string,
  ) {
    return this.prisma.taskGroup.update({
      where: {
        userId,
        id: taskGroupId,
      },
      data: dto,
    });
  }

  async delete(taskGroupId: string) {
    return this.prisma.taskGroup.delete({
      where: {
        id: taskGroupId,
      },
    });
  }
}
