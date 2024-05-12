// src/plant/plant.service.ts
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreatePlantEvent } from 'src/events/create-plant.event';
import { PLANT_REPOSITORY_TOKEN } from 'src/tokens';
import { Plant } from './plant.entity';

@Injectable()
export class PlantService implements OnModuleInit {
  constructor(
    @Inject(PLANT_REPOSITORY_TOKEN)
    private readonly plantRepository: Repository<Plant>,
  ) {}

  async onModuleInit() {
    await this.createDefaultPlants();
  }

  async createDefaultPlants() {
    // if the table isn't empty return
    const plants = await this.findAll();
    if (plants.length > 0) return;
    await this.plantRepository.save(
      new Plant({
        name: 'My plant',
        description: 'The plant in my window',
        location: 'Window 1',
      }),
    );
    await this.plantRepository.save(
      new Plant({
        name: 'Ginko Bilboa',
        description: 'Origin from China',
        location: 'Window 2',
      }),
    );
  }

  handleCreatePlant(data: CreatePlantEvent) {
    const plant = new Plant(data);
    this.plantRepository.save(plant);
  }
  findAll(): Promise<Plant[]> {
    return this.plantRepository.find();
  }

  findOne(id: number): Promise<Plant | null> {
    return this.plantRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.plantRepository.delete(id);
  }
}
