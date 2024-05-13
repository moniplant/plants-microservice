import { Module } from '@nestjs/common';
import { PlantService } from './plant.service';
import { PlantController } from './plant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plant } from './plant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plant])],
  controllers: [PlantController],
  providers: [PlantService],
})
export class PlantModule {}
