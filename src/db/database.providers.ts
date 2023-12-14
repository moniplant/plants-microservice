import { DataSource } from 'typeorm';
import { DATA_SOURCE_TOKEN } from '../helpers/constants';

export const databaseProviders = [
  {
    provide: DATA_SOURCE_TOKEN,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'test',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
