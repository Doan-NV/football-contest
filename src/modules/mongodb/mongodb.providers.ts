/* eslint-disable @typescript-eslint/no-explicit-any */
import { createConnection } from 'mongoose';

import { ApiConfigService } from '../shared/services/api-config.service';

interface IConfigDB {
  connect: string;
  host: string;
  port: string;
  database: string;
  user: string;
  password: string;
  db_auth: string;
  db_replica: string;
  is_direct_connection: string;
}

const getUrlConnect = (db: IConfigDB): string => {
  const auth = db.user && db.password ? `${db.user}:${db.password}@` : '';
  const hosts = db.host?.split(',');
  const urlHost = hosts?.map((host) => `${host}:${db.port}`).join(',');
  const urlConnect = `mongodb://${auth}${urlHost}/${db.database}`;

  return urlConnect;
};

export const mongodbProviders = [
  {
    provide: 'MAIN_MONGO_CONNECTION',
    inject: [ApiConfigService],
    useFactory: (configService: ApiConfigService) => {
      const configDB = configService.get('configDB');
      const saleUrlConnect = getUrlConnect(configDB as any);

      return createConnection(saleUrlConnect, {
        directConnection: true,
      });
    },
  },
];
