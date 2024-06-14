// src/plant/plant.entity.ts
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Plant } from '../plant/plant.entity';

@Entity('plant_types')
export class PlantType {
  @PrimaryColumn({ unique: true })
  alias: string;

  @Column({ length: 60 })
  full_name: string;

  @Column({ length: 600, nullable: true })
  description: string;

  @OneToMany(() => Plant, (plant) => plant.plantType)
  plants: Plant[];

  constructor(plantType: Partial<PlantType>) {
    Object.assign(this, plantType);
  }
}
