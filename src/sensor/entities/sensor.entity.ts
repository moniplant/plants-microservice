import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Plant } from '../../plant/plant.entity';

@Entity('sensors')
export class Sensor {
  @PrimaryColumn({ unique: true })
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
    this.id = sensor?.id || uuidv4(); // Generate a UUID if `id` is not provided
    Object.assign(this, sensor);
  }
}
