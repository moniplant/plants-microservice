// src/plant/plant.entity.ts
import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  Index,
  PrimaryColumn,
} from 'typeorm';
import { Sensor } from '../sensor/entities/sensor.entity';
import { PlantType } from '../plant_types/plant.type.entity';

@Entity('plants')
export class Plant {
  @Column()
  @Index({ unique: true })
  @PrimaryColumn()
  id: string;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 200 })
  description: string;

  @Column({ nullable: true })
  plantTypeAlias: string;

  @Column()
  location: string;

  @Column({
    name: 'adoption_date',
    type: 'datetime',
    default: () => 'NOW()',
  })
  adoptionDate: Date;

  @ManyToOne(() => PlantType, (plantType) => plantType.plants, {
    onDelete: 'SET NULL',
  })
  plantType: PlantType;

  @OneToMany(() => Sensor, (sensor) => sensor.plant)
  sensors: Sensor[];

  constructor(plant: Partial<Plant>) {
    Object.assign(this, plant);
  }
}
