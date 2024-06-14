import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantType } from './plant.type.entity';
import { PlantTypeService } from './plant.type.service';
import { PlantTypeController } from './plant.type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PlantType])],
  controllers: [PlantTypeController],
  providers: [PlantTypeService],
  exports: [PlantTypeService],
})
export class PlantTypeModule {}
