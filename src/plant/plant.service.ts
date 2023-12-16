// src/plant/plant.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreatePlantEvent } from 'src/events/create-plant.event';
import { PLANT_REPOSITORY_TOKEN } from 'src/tokens';
import { Plant } from './plant.entity';

@Injectable()
export class PlantService {
  constructor(
    @Inject(PLANT_REPOSITORY_TOKEN)
    private readonly plantRepository: Repository<Plant>,
  ) {}

  handleCreatePlant(data: CreatePlantEvent) {
    const plant = new Plant(data);
    return this.plantRepository.save(plant);
  }
}
