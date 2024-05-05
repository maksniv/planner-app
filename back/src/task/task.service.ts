import { Injectable } from '@nestjs/common';
import { TaskDto } from './dto/task.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getAll(userId: string) {
    return this.prisma.task.findMany({
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
      where: {
        userId,
      },
    });
  }

  async create(dto: TaskDto, userId: string) {
    const { taskGroupId, ...taskData } = dto;
    return this.prisma.task.create({
      data: {
        ...taskData,
        user: {
          connect: {
            id: userId,
          },
        },
        taskGroup: {
          connect: {
            id: dto.taskGroupId || undefined,
          },
        },
      },
    });
  }

  async update(dto: Partial<TaskDto>, taskId: string, userId: string) {
    return this.prisma.task.update({
      where: {
        userId,
        id: taskId,
      },
      data: dto,
    });
  }

  async delete(taskId: string) {
    return this.prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  }
}
