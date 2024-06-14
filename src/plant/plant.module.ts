import { Module } from '@nestjs/common';
import { PlantService } from './plant.service';
import { PlantController } from './plant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plant } from './plant.entity';
import { PlantTypeModule } from '../plant_types/plant.type.module';

@Module({
  imports: [TypeOrmModule.forFeature([Plant]), PlantTypeModule],
  controllers: [PlantController],
  providers: [PlantService],
})
export class PlantModule {}
