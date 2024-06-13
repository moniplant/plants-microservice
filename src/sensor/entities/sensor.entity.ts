import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Plant } from '../../plant/plant.entity';

@Entity()
export class Sensor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column()
  quantity: string;

  @Column()
  unit: string;

  @Column({ nullable: true })
  plantId: number;

  @ManyToOne(() => Plant, (plant) => plant.sensors, {
    onDelete: 'SET NULL',
  })
  plant: Plant;
}
