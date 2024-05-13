import { Module } from '@nestjs/common';
import { PlantModule } from './plant/plant.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { PlantTypeModule } from './plant_types/plant.type.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get<string>('DB_TYPE') as 'mysql' | 'mariadb',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_ROOT_USERNAME'),
          password: configService.get<string>('DB_ROOT_PASSWORD'),
          database: configService.get<string>('DB_DATABASE_NAME'),
          autoLoadEntities: true,
          synchronize: true,
        };
      },
      // dataSource receives the configured DataSourceOptions
      // and returns a Promise<DataSource>.
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    PlantModule,
    PlantTypeModule,
  ],
})
export class AppModule {}
