import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { startOfDay, endOfDay, addDays } from 'date-fns';

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
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());
    const weekEnd = startOfDay(addDays(new Date(), 7));

    const profile = await this.getById(id);

    // first statistics
    const totalTasks = profile.task.length;
    const completedTasks = await this.prisma.task.count({
      where: {
        userId: id,
        isCompleted: true,
      },
    });
    const uncompletedTasks = await this.prisma.task.count({
      where: {
        userId: id,
        isCompleted: false,
        deadlines: {
          gte: todayStart.toISOString(),
        },
      },
    });
    const overdueTasks = await this.prisma.task.count({
      where: {
        userId: id,
        isCompleted: false,
        deadlines: {
          lte: todayStart.toISOString(),
        },
      },
    });

    // second statistics
    const todayTasks = await this.prisma.task.count({
      where: {
        userId: id,
        deadlines: {
          gte: todayStart.toISOString(),
          lte: todayEnd.toISOString(),
        },
      },
    });

    const weekTasks = await this.prisma.task.count({
      where: {
        userId: id,
        deadlines: {
          gte: todayStart.toISOString(),
          lte: weekEnd.toISOString(),
        },
      },
    });

    return {
      statisticsQuantity: {
        label: ['Всего задач', 'Завершенных задач', 'Незавершенных задач', 'Просроченных задач'],
        value: [totalTasks, completedTasks, uncompletedTasks, overdueTasks],
        backgroundColor: ['#635fc7','#21725e','#3498db','#e05b5b']
      },
      statisticsWeekly: {
        label: ['Задач на сегодня', 'Задач на неделю'],
        value: [todayTasks, weekTasks],
        backgroundColor: ['#d7c32c','#3498db']
      },
    };
  }
}
