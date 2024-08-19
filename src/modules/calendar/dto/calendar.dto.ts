import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

export class GetCalendarFootballDto {
  @IsOptional()
  @ApiProperty({
    description: 'The date of the match',
  })
  @IsDateString()
  start_date: Date;

  @IsOptional()
  @ApiProperty({
    description: 'The date of the match',
  })
  @IsDateString()
  end_date: Date;
}
