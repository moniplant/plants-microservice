import { DataSource } from 'typeorm';
import { DATA_SOURCE_TOKEN } from '../tokens';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: DATA_SOURCE_TOKEN,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: configService.get<string>('DB_TYPE') as 'mysql' | 'mariadb',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_ROOT_USERNAME'),
        password: configService.get<string>('DB_ROOT_PASSWORD'),
        database: configService.get<string>('DB_DATABASE_NAME'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
