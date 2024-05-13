// src/plant/plant.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('plants')
export class Plant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 200 })
  description: string;

  @Column()
  plant_type: string;

  @Column()
  location: string;

  @Column({
    name: 'adoption_date',
    type: 'datetime',
    default: () => 'NOW()',
  })
  adoptionDate: Date;

  constructor(plant: Partial<Plant>) {
    Object.assign(this, plant);
  }
}
