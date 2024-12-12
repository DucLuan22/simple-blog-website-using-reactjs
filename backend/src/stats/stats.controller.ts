import { Controller, Get, Param } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statisticsService: StatsService) {}

  @Get('yearly-views/:user_id')
  async getYearlyViews(@Param('user_id') user_id: number) {
    return this.statisticsService.getYearlyViews(user_id);
  }

  @Get('monthly-views/:user_id')
  async getMonthlyViews(@Param('user_id') user_id: number) {
    return this.statisticsService.getMonthlyViews(user_id);
  }

  @Get('today-stats/:user_id')
  async getTodayStats(@Param('user_id') user_id: number) {
    return this.statisticsService.getTodayStatsByUserId(user_id);
  }
}
