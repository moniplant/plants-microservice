import { Controller } from '@nestjs/common';
import { EventPattern, Payload, MessagePattern } from '@nestjs/microservices';
import { PlantTypeService } from './plant.type.service';
import { CREATE_PLANT_TYPE, LIST_PLANT_TYPES } from 'src/events';

@Controller()
export class PlantTypeController {
  constructor(private readonly plantTypeService: PlantTypeService) {}

  @EventPattern(CREATE_PLANT_TYPE)
  handleCreatePlantType(@Payload() data: any) {
    this.plantTypeService.handleCreatePlantType(data);
  }

  @MessagePattern(LIST_PLANT_TYPES)
  handleListPlantTypes(@Payload() _data: any) {
    return this.plantTypeService.findAll();
  }
}
