// src/plant/plant.controller.ts
import { Controller } from '@nestjs/common';
import { PlantService } from './plant.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CREATE_PLANT, LIST_PLANTS } from 'src/events';
import { CreateorUpdatePlantEvent } from './events/create-plant.event';

@Controller()
export class PlantController {
  constructor(private readonly plantService: PlantService) {}

  @EventPattern(CREATE_PLANT)
  handleCreatePlant(@Payload() data: CreateorUpdatePlantEvent) {
    this.plantService.handleCreatePlant(data);
  }

  @MessagePattern(LIST_PLANTS)
  handleListPlant(@Payload() _data: any) {
    return this.plantService.findAll();
  }
}
