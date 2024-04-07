import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { ConfigModule } from '@nestjs/config';
import { StatisticsModule } from './statistics/statistics.module';
import { GroupsTaskModule } from './groupsTask/groupsTask.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    TaskModule,
    StatisticsModule,
    GroupsTaskModule,
  ],
})
export class AppModule {}
