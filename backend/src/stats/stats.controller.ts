import { Controller, Get, Param } from '@nestjs/common';
import { StatsService } from './stats.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('stats')
export class StatsController {
  constructor(private readonly statisticsService: StatsService) {}

  @Get('get-views-stats/:user_id')
  async getViews(@Param('user_id') user_id: number) {
    return this.statisticsService.getViews(user_id);
  }

  @Get('today-stats/:user_id')
  async getTodayStats(@Param('user_id') user_id: number) {
    return this.statisticsService.getTodayStatsByUserId(user_id);
  }

  @Get('get-posts-stats/:user_id')
  async getPostStatsByUserId(@Param('user_id') user_id: number) {
    return this.statisticsService.getPostStatsByUserId(user_id);
  }
}
