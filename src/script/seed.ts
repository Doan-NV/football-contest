import mongoose from 'mongoose';
import { competitionSchema } from 'src/modules/mongodb/models/competition.schema';
import { countrySchema } from 'src/modules/mongodb/models/country.schema';
import { matchSchema } from 'src/modules/mongodb/models/match.schema';
import { teamSchema } from 'src/modules/mongodb/models/team.schema';
import 'dotenv/config';

export const run = async () => {
  try {
    const url = `${process.env.DB_CONNECTION}://${process.env.DB_USER_DATABASE}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
    await mongoose.connect(url);
    // eslint-disable-next-line no-console
    const countryModel = mongoose.model('countries', countrySchema);
    const data = await countryModel.find();

    if (data.length > 0) {
      // await mongoose.disconnect();

      return;
    }

    await countryModel.insertMany([
      {
        _id: new mongoose.Types.ObjectId('64e04aee9b1d8b0d6c4e8e03'),
        name: 'England',
        logo: 'england_logo.png',
      },
      {
        _id: new mongoose.Types.ObjectId('64e04af49b1d8b0d6c4e8e04'),
        name: 'Spain',
        logo: 'spain_logo.png',
      },
    ]);

    const competitionModel = mongoose.model('competitions', competitionSchema);
    await competitionModel.insertMany([
      {
        _id: new mongoose.Types.ObjectId('64e04adf9b1d8b0d6c4e8e01'),
        name: 'Premier League',
        logo: 'premier_league_logo.png',
        description: 'Top-tier football league in England.',
      },
      {
        _id: new mongoose.Types.ObjectId('64e04ae79b1d8b0d6c4e8e02'),
        name: 'La Liga',
        logo: 'la_liga_logo.png',
        description: 'Top-tier football league in Spain.',
      },
      {
        _id: new mongoose.Types.ObjectId('66c372cb2d4f686cac7c2f44'),
        name: 'English Football League - ChampionshipPremier League',
        logo: 'premier_league_logo.png',
        description: 'Top-2nd football league in England.',
      },
    ]);

    const teamModel = mongoose.model('teams', teamSchema);
    await teamModel.insertMany([
      {
        _id: new mongoose.Types.ObjectId('64e04afb9b1d8b0d6c4e8e05'),
        name: 'Manchester United',
        logo: 'man_utd_logo.png',
        competition_id: new mongoose.Types.ObjectId('64e04adf9b1d8b0d6c4e8e01'),
        country_id: new mongoose.Types.ObjectId('64e04aee9b1d8b0d6c4e8e03'),
      },
      {
        _id: new mongoose.Types.ObjectId('64e04b029b1d8b0d6c4e8e06'),
        name: 'Real Madrid',
        logo: 'real_madrid_logo.png',
        competition_id: new mongoose.Types.ObjectId('64e04ae79b1d8b0d6c4e8e02'),
        country_id: new mongoose.Types.ObjectId('64e04af49b1d8b0d6c4e8e04'),
      },
      {
        _id: new mongoose.Types.ObjectId('64e04b089b1d8b0d6c4e8e07'),
        name: 'Arsenal',
        logo: 'arsenal_logo.png',
        competition_id: new mongoose.Types.ObjectId('64e04adf9b1d8b0d6c4e8e01'),
        country_id: new mongoose.Types.ObjectId('64e04aee9b1d8b0d6c4e8e03'),
      },
    ]);

    const matchModel = mongoose.model('matches', matchSchema);
    await matchModel.insertMany([
      {
        _id: new mongoose.Types.ObjectId('64e04b0f9b1d8b0d6c4e8e08'),
        competition_id: new mongoose.Types.ObjectId('64e04adf9b1d8b0d6c4e8e01'),
        home_team_id: new mongoose.Types.ObjectId('64e04afb9b1d8b0d6c4e8e05'),
        away_team_id: new mongoose.Types.ObjectId('64e04b089b1d8b0d6c4e8e07'),
        status_id: 1,
        home_score: [1, 0, 0, 0, -1, 0, 0],
        away_score: [1, 0, 0, 0, -1, 0, 0],
        match_time: 16123123123,
      },
      {
        _id: new mongoose.Types.ObjectId('64e04b179b1d8b0d6c4e8e09'),
        competition_id: new mongoose.Types.ObjectId('64e04adf9b1d8b0d6c4e8e01'),
        home_team_id: new mongoose.Types.ObjectId('64e04b089b1d8b0d6c4e8e07'),
        away_team_id: new mongoose.Types.ObjectId('64e04afb9b1d8b0d6c4e8e05'),
        status_id: 1,
        home_score: [1, 0, 0, 0, -1, 0, 0],
        away_score: [1, 0, 0, 0, -1, 0, 0],
        match_time: 1623412342,
      },
      {
        _id: new mongoose.Types.ObjectId('64e04b1d9b1d8b0d6c4e8e0a'),
        competition_id: new mongoose.Types.ObjectId('64e04ae79b1d8b0d6c4e8e02'),
        home_team_id: new mongoose.Types.ObjectId('64e04b029b1d8b0d6c4e8e06'),
        away_team_id: new mongoose.Types.ObjectId('64e04afb9b1d8b0d6c4e8e05'),
        status_id: 1,
        home_score: [1, 0, 0, 0, -1, 0, 0],
        away_score: [1, 0, 0, 0, -1, 0, 0],
        match_time: 162131231223,
      },
      {
        _id: new mongoose.Types.ObjectId('66c3775b2d4f686cac7c2f47'),
        competition_id: new mongoose.Types.ObjectId('64e04ae79b1d8b0d6c4e8e02'),
        home_team_id: new mongoose.Types.ObjectId('64e04b029b1d8b0d6c4e8e06'),
        away_team_id: new mongoose.Types.ObjectId('64e04afb9b1d8b0d6c4e8e05'),
        status_id: 1,
        home_score: [1, 0, 0, 0, -1, 0, 0],
        away_score: [1, 0, 0, 0, -1, 0, 0],
        match_time: 162131231223,
      },
      {
        _id: new mongoose.Types.ObjectId('66c373472d4f686cac7c2f45'),
        competition_id: new mongoose.Types.ObjectId('66c372cb2d4f686cac7c2f44'),
        home_team_id: new mongoose.Types.ObjectId('64e04b089b1d8b0d6c4e8e07'),
        away_team_id: new mongoose.Types.ObjectId('64e04afb9b1d8b0d6c4e8e05'),
        status_id: 1,
        home_score: [1, 0, 0, 0, -1, 0, 0],
        away_score: [1, 0, 0, 0, -1, 0, 0],
        match_time: 162131231223,
      },
    ]);
    // await mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
};
