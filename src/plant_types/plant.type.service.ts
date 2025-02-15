// src/plant/plant.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PlantType } from './plant.type.entity';
import { PLANT_TYPES } from './plant.type.constant';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class PlantTypeService implements OnModuleInit {
  plantTypesInitiated = new ReplaySubject<void>();
  constructor(
    private dataSource: DataSource,
    @InjectRepository(PlantType)
    private readonly plantTypeRepository: Repository<PlantType>,
  ) {}

  async onModuleInit() {
    await this.populateDB();
    this.plantTypesInitiated.next();
    this.plantTypesInitiated.complete();
  }

  async populateDB() {
    const dbRows = (await this.plantTypeRepository.find()).length;
    if (dbRows === PLANT_TYPES.length) return;

    // Empty DB, we should populate with default plant types
    const queryRunner =
      this.plantTypeRepository.queryRunner ??
      this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      PLANT_TYPES.forEach(async (plantDto) => {
        const plantType = this.plantTypeRepository.create({ ...plantDto });
        await queryRunner.manager.save(plantType);
      });
      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  handleCreatePlantType(_data: any) {
    //
  }

  findAll(): Promise<PlantType[]> {
    return this.plantTypeRepository.find();
  }

  findOne(alias: string): Promise<PlantType | null> {
    return this.plantTypeRepository.findOneBy({ alias });
  }

  async remove(id: number): Promise<void> {
    await this.plantTypeRepository.delete(id);
  }
}
