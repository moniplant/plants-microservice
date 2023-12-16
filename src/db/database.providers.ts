import { DataSource } from 'typeorm';
import { DATA_SOURCE_TOKEN } from '../tokens';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: DATA_SOURCE_TOKEN,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: configService.get<string>('DB_TYPE') as "mysql" | "mariadb",
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('MYSQL_USER'),
        password: configService.get<string>('MYSQL_ROOT_PASSWORD'),
        database: configService.get<string>('MYSQL_DATABASE'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
