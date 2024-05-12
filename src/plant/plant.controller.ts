// src/plant/plant.controller.ts
import { Controller, Logger } from '@nestjs/common';
import { PlantService } from './plant.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CREATE_PLANT } from 'src/events';

@Controller()
export class PlantController {
  constructor(private readonly plantService: PlantService) {}

  @EventPattern(CREATE_PLANT)
  handleCreatePlant(@Payload() data: any) {
    Logger.log('Received new payload: ', data);
    this.plantService.handleCreatePlant(data);
  }
}
