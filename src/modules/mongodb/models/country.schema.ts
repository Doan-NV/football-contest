import type { Connection } from 'mongoose';
import { Schema } from 'mongoose';

const countrySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const countryProvider = [
  {
    provide: 'COUNTRY_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Countries', countrySchema),
    inject: ['MAIN_MONGO_CONNECTION'],
  },
];

export interface ICountry extends Document {
  _id?: string;
  name?: string;
  logo?: string;
  createdAt: Date;
  updatedAt: Date;
}
export { countryProvider, countrySchema };
