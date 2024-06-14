// src/plant/plant.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreatePlantEvent } from 'src/events/create-plant.event';
import { Plant } from './plant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PlantTypeService } from '../plant_types/plant.type.service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PlantService implements OnModuleInit {
  constructor(
    @InjectRepository(Plant)
    private readonly plantRepository: Repository<Plant>,
    private readonly plantTypeService: PlantTypeService,
  ) {}

  async onModuleInit() {
    await lastValueFrom(this.plantTypeService.plantTypesInitiated).then(
      async () => await this.createDefaultPlants(),
    );
  }

  async createDefaultPlants() {
    // if the table isn't empty return
    const plants = await this.findAll();
    if (plants.length > 0) return;
    await this.plantRepository.save(
      new Plant({
        name: 'My plant',
        description: 'The plant in my window',
        plantTypeAlias: 'Aloe',
        location: 'Window 1',
      }),
    );
    await this.plantRepository.save(
      new Plant({
        name: 'Ginko Bilboa',
        description: 'Origin from China',
        plantTypeAlias: 'Cactus',
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
