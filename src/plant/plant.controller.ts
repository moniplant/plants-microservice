// src/plant/plant.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { PlantService } from './plant.service';
import { Plant } from './plant.entity';

@Controller('plants')
export class PlantController {
  constructor(private readonly plantService: PlantService) {}

  @Get()
  findAll(): Promise<Plant[]> {
    return this.plantService.findAll();
  }

  @Post()
  create(@Body() plantData: Partial<Plant>): Promise<Plant> {
    return this.plantService.create(plantData);
  }
}
