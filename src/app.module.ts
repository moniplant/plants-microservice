import { Module } from '@nestjs/common';
import { PlantModule } from './plant/plant.module';

@Module({
  imports: [PlantModule],
})
export class AppModule {}
