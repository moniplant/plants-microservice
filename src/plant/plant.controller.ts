// src/plant/plant.controller.ts
import { Controller } from '@nestjs/common';
import { PlantService } from './plant.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CREATE_PLANT } from 'src/events';

@Controller()
export class PlantController {
  constructor(private readonly plantService: PlantService) {}

  @EventPattern(CREATE_PLANT)
  handleCreatePlant(@Payload() data: any) {
    this.plantService.handleCreatePlant(data);
  }
}
