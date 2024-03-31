import { CurrentUser } from '../auth/decorators/user.decorators';
import {
  Controller,
  Get,
} from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { Auth } from '../auth/decorators/auth.decorators';

@Controller('user/statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  @Auth()
  async statistics(@CurrentUser('id') id: string) {
    return this.statisticsService.getStatistics(id);
  }
}
