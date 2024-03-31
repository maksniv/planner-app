import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { startOfDay, subDays } from 'date-fns';

@Injectable()
export class StatisticsService {
  constructor(private prisma: PrismaService) {}

  getById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        task: true,
        task_group: true,
      },
    });
  }

  async getStatistics(id: string) {
    const profile = await this.getById(id);

    const totalTask = profile.task.length;
    const completedTask = await this.prisma.task.count({
      where: {
        userId: id,
        isCompleted: true,
      },
    });

    const todayStart = startOfDay(new Date());
    const weekStart = startOfDay(subDays(new Date(), 7));

    const todayTasks = await this.prisma.task.count({
      where: {
        userId: id,
        createdAt: {
          gte: todayStart.toISOString(),
        },
      },
    });

    const weekTasks = await this.prisma.task.count({
      where: {
        userId: id,
        createdAt: {
          gte: weekStart.toISOString(),
        },
      },
    });

    return {
      label: [
        'Всего задач',
        'Завершенных задач',
        'Задач на сегодня',
        'Задач на неделю',
      ],
      value: [totalTask, completedTask, todayTasks, weekTasks],
    };
  }
}
