import type { Connection } from 'mongoose';
import { Schema } from 'mongoose';

const matchSchema = new Schema(
  {
    competition_id: {
      type: Schema.Types.ObjectId,
      ref: 'Competition',
      required: true,
    },
    home_team_id: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    away_team_id: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    status_id: {
      type: Number,
      required: true,
      default: 1, // Not started
    },
    home_score: {
      type: [Number],
      required: true,
    },
    away_score: {
      type: [Number],
      required: true,
    },
    match_time: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const matchProvider = [
  {
    provide: 'MATCH_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Matches', matchSchema),
    inject: ['MAIN_MONGO_CONNECTION'],
  },
];

export interface IMatch extends Document {
  _id?: string;
  name?: string;
  competition: string;
  home_team: string;
  away_team: string;
  status_id: number;
  home_score: number[];
  away_score: number[];
  match_date: Date;
  createdAt: Date;
  updatedAt: Date;
}
export { matchProvider, matchSchema };
