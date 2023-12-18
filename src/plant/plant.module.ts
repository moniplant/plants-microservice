import { Module } from '@nestjs/common';
import { plantProviders } from './plant.providers';
import { PlantService } from './plant.service';
import { DatabaseModule } from '../db/database.module';
import { PlantController } from './plant.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [PlantController],
  providers: [...plantProviders, PlantService],
})
export class PlantModule {}
