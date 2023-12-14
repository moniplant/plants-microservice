// src/plant/plant.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Plant } from './plant.entity';
import { PLANT_REPOSITORY_TOKEN } from '../helpers/constants';

@Injectable()
export class PlantService {
  constructor(
    @Inject(PLANT_REPOSITORY_TOKEN)
    private readonly plantRepository: Repository<Plant>,
  ) {}

  async findAll(): Promise<Plant[]> {
    return this.plantRepository.find();
  }

  async create(plantData: Partial<Plant>): Promise<Plant> {
    const plant = this.plantRepository.create(plantData);
    return this.plantRepository.save(plant);
  }
}
