import { Module } from '@nestjs/common';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { matchProvider } from '../mongodb/models/match.schema';
import { MongoDbModule } from '../mongodb/mongodb.module';

@Module({
  imports: [MongoDbModule],
  controllers: [CalendarController],
  providers: [CalendarService, ...matchProvider],
})
export class CalendarModule {}
