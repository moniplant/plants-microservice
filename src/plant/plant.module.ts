import { Module } from '@nestjs/common';
import { plantProviders } from './plant.providers';
import { PlantService } from './plant.service';
import { DatabaseModule } from '../db/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...plantProviders, PlantService],
})
export class PlantModule {}
