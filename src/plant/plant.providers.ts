import { DataSource } from 'typeorm';
import { Plant } from './plant.entity';
import {
  DATA_SOURCE_TOKEN,
  PLANT_REPOSITORY_TOKEN,
} from '../helpers/constants';

export const plantProviders = [
  {
    provide: PLANT_REPOSITORY_TOKEN,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Plant),
    inject: [DATA_SOURCE_TOKEN],
  },
];
