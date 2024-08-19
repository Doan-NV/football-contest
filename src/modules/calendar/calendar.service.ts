/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import type { IMatch } from '../mongodb/models/match.schema';
import type { GetCalendarFootballDto } from './dto/calendar.dto';

@Injectable()
export class CalendarService {
  constructor(@Inject('MATCH_MODEL') private matchModel: Model<IMatch>) {}

  async getCalendar(
    getCalendarFootballDto: GetCalendarFootballDto,
  ): Promise<any> {
    let { start_date, end_date } = getCalendarFootballDto;

    if (!start_date || !end_date) {
      const currentDate = new Date();
      start_date = new Date(currentDate.setHours(0, 0, 0, 0));
      end_date = new Date(currentDate.setHours(23, 59, 59, 999));
    }

    const data = await this.matchModel
      .aggregate([
        {
          $lookup: {
            from: 'competitions',
            localField: 'competition_id',
            foreignField: '_id',
            as: 'competition_details',
          },
        },
        {
          $unwind: '$competition_details',
        },
        {
          $lookup: {
            from: 'teams',
            localField: 'home_team_id',
            foreignField: '_id',
            as: 'home_team_details',
          },
        },
        {
          $unwind: '$home_team_details',
        },
        {
          $lookup: {
            from: 'teams',
            localField: 'away_team_id',
            foreignField: '_id',
            as: 'away_team_details',
          },
        },
        {
          $unwind: '$away_team_details',
        },
        {
          $lookup: {
            from: 'countries',
            localField: 'home_team_details.country_id',
            foreignField: '_id',
            as: 'home_country_details',
          },
        },
        {
          $unwind: '$home_country_details',
        },
        {
          $project: {
            _id: 1,
            competition_id: '$competition',
            status_id: 1,
            home_score: 1,
            away_score: 1,
            match_time: 1,
            createdAt: 1,
            updatedAt: 1,
            home_country: {
              _id: '$home_country_details._id',
              name: '$home_country_details.name',
              logo: '$home_country_details.logo',
            },
            detail_competition: {
              _id: '$competition_details._id',
              name: '$competition_details.name',
              logo: '$competition_details.logo',
              description: '$competition_details.description',
            },
            home_team_detail: '$home_team_details',
            away_team_detail: '$away_team_details',
          },
        },
        // Group by competition and country
        {
          $group: {
            _id: {
              competition_id: '$detail_competition._id',
              country_id: '$home_country._id',
            },
            detail_competition: {
              $first: '$detail_competition',
            },
            detail_country: {
              $first: '$home_country',
            },
            matches: {
              $push: {
                _id: '$_id',
                competition_id: '$competition_id',
                home_team_id: '$home_team_id',
                away_team_id: '$away_team_id',
                status_id: '$status_id',
                home_score: '$home_score',
                away_score: '$away_score',
                match_time: '$match_time',
                home_team_detail: '$home_team_detail',
                away_team_detail: '$away_team_detail',
                created_at: '$createdAt',
              },
            },
          },
        },
        {
          $sort: {
            'detail_country.name': 1,
            'detail_competition.name': 1,
          },
        },
        {
          $project: {
            _id: 0,
            detail_country: '$detail_country',
            matches: {
              $map: {
                input: {
                  $sortArray: {
                    input: '$matches',
                    sortBy: {
                      createdAt: 1,
                      status_id: 1,
                      match_time: 1,
                    },
                  },
                },
                as: 'item',
                in: '$$item',
              },
            },
            detail_competition: 1,
          },
        },
      ])
      .exec();

    return data;
  }
}
