import { DataSource } from 'typeorm';
import { Plant } from '../entities/plant.entity';
import { PLANT_REPOSITORY_TOKEN, DATA_SOURCE_TOKEN } from 'src/tokens';

export const plantProviders = [
  {
    provide: PLANT_REPOSITORY_TOKEN,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Plant),
    inject: [DATA_SOURCE_TOKEN],
  },
];
