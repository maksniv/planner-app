import { Module } from '@nestjs/common';
import { GroupsTaskService } from './groupsTask.service';
import { GroupsTaskController } from './groupsTask.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [GroupsTaskController],
  providers: [GroupsTaskService, PrismaService],
  exports: [GroupsTaskService],
})
export class GroupsTaskModule {}
