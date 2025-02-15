// src/plant/plant.entity.ts
import { Entity, Column, OneToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Sensor } from '../sensor/entities/sensor.entity';
import { PlantType } from '../plant_types/plant.type.entity';

@Entity('plants')
export class Plant {
  @PrimaryColumn({ unique: true })
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
    this.id = plant?.id || uuidv4(); // Generate a UUID if `id` is not provided
    Object.assign(this, plant);
  }
}
