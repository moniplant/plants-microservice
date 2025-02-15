import { Column, Entity, Index, ManyToOne, PrimaryColumn } from 'typeorm';
import { Plant } from '../../plant/plant.entity';

@Entity('sensors')
export class Sensor {
  @Column()
  @Index({ unique: true })
  @PrimaryColumn()
  id: string;

  @Column()
  label: string;

  @Column()
  quantity: string;

  @Column()
  unit: string;

  @Column({ nullable: true })
  plant_id: string;

  @ManyToOne(() => Plant, (plant) => plant.sensors, {
    onDelete: 'SET NULL',
  })
  plant: Plant;

  constructor(sensor: Partial<Sensor>) {
    Object.assign(this, sensor);
  }
}
