// src/plant/plant.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PlantType } from './plant.type.entity';

@Injectable()
export class PlantTypeService implements OnModuleInit {
  constructor(
    @InjectRepository(PlantType)
    private readonly plantTypeRepository: Repository<PlantType>,
  ) {}

  async onModuleInit() {
    await this.populateDB();
  }

  async populateDB() {
    //
  }

  handleCreatePlant(_data: any) {
    //
  }

  findAll(): Promise<PlantType[]> {
    return this.plantTypeRepository.find();
  }

  findOne(id: number): Promise<PlantType | null> {
    return this.plantTypeRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.plantTypeRepository.delete(id);
  }
}
