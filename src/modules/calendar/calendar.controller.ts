/* eslint-disable @typescript-eslint/no-explicit-any */
import { Body, Controller, Get, UseFilters } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { ApiTags } from '@nestjs/swagger';
import { CustomExceptionFilter } from 'src/filters/custom-exception.filter';
import { GetCalendarFootballDto } from './dto/calendar.dto';

@Controller('v1/calendar')
@ApiTags('v1 - calendar')
@UseFilters(CustomExceptionFilter)
export class CalendarController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private readonly calendarService: CalendarService) {}

  @Get()
  async getCalendar(
    @Body() getCalendarFootballDto: GetCalendarFootballDto,
  ): Promise<any> {
    try {
      const data = await this.calendarService.getCalendar(
        getCalendarFootballDto,
      );

      return {
        message: 'Success',
        data: JSON.parse(JSON.stringify(data)),
      };
    } catch (error) {
      throw error;
    }
  }
}
