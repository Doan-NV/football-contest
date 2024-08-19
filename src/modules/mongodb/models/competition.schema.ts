import type { Connection } from 'mongoose';
import { Schema } from 'mongoose';

const competitionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
const competitionProvider = [
  {
    provide: 'COMPETITION_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Competitions', competitionSchema),
    inject: ['MAIN_MONGO_CONNECTION'],
  },
];

export interface ICountry extends Document {
  _id?: string;
  name?: string;
  logo?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
export { competitionProvider, competitionSchema };
