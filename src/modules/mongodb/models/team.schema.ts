import type { Connection } from 'mongoose';
import { Schema } from 'mongoose';

const teamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    competition_id: {
      type: Schema.Types.ObjectId,
      ref: 'Competition',
      required: true,
    },
    country_id: {
      type: Schema.Types.ObjectId,
      ref: 'Country',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const teamProvider = [
  {
    provide: 'TEAM_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Teams', teamSchema),
    inject: ['MAIN_MONGO_CONNECTION'],
  },
];

export interface ITeam extends Document {
  _id?: string;
  name?: string;
  logo?: string;
  competition: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}
export { teamProvider, teamSchema };
