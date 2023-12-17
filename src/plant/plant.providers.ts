import { DataSource } from 'typeorm';
import { PLANT_REPOSITORY_TOKEN, DATA_SOURCE_TOKEN } from 'src/tokens';
import { Plant } from './plant.entity';

export const plantProviders = [
  {
    provide: PLANT_REPOSITORY_TOKEN,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Plant),
    inject: [DATA_SOURCE_TOKEN],
  },
];
