import { Module } from '@nestjs/common';
import { PlantModule } from './plant/plant.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PlantModule,
    ConfigModule.forRoot()
  ],
})
export class AppModule { }
