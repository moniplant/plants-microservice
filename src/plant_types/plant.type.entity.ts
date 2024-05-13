// src/plant/plant.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity('plant_types')
export class PlantType {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ unique: true })
  alias: string;

  @Column({ length: 60 })
  full_name: string;

  @Column({ length: 600, nullable: true })
  description: string;

  constructor(plantType: Partial<PlantType>) {
    Object.assign(this, plantType);
  }
}
