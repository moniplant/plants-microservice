// src/plant/plant.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Plant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 200 })
  description: string;

  @Column()
  location: string;

  @Column({ name: 'adoption_date' })
  adoptionDate: Date;
}
