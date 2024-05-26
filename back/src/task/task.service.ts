import { Injectable } from '@nestjs/common';
import { TaskDto } from './dto/task.dto';
import { PrismaService } from 'src/prisma.service';
import { toBoolean } from '../utils/toBoolean';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getAll(userId: string, isCompleted?: string, search?: string, groupId?: string)
  {
    return this.prisma.task.findMany({
      orderBy: [
        {
          deadlines: 'asc',
        },
      ],
      where: {
        name: {
          search: search !== '' ? search : undefined,
        },
        taskGroupId: toBoolean(groupId) !== null ? groupId : undefined,
        isCompleted: toBoolean(isCompleted),
        userId,
      },
    });
  }

  async getTaskById(taskId: string) {
    return this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
      include: {
        taskGroup: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
      },
    });
  }

  async create(dto: TaskDto, userId: string) {
    const { taskGroupId, ...taskData } = dto;

    return this.prisma.task.create({
      data: {
        user: {
          connect: {
            id: userId,
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
