import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { Sensor } from './entities/sensor.entity';

@Injectable()
export class SensorService {
  constructor(
    @InjectRepository(Sensor)
    private readonly sensorRepository: Repository<Sensor>,
  ) {}

  create(createSensorDto: CreateSensorDto) {
    const sensor = new Sensor(createSensorDto);
    this.sensorRepository.save(sensor);
  }

  findAll(): Promise<Sensor[]> {
    return this.sensorRepository.find();
  }

  findOne(id: string): Promise<Sensor | null> {
    return this.sensorRepository.findOneBy({ id });
  }

  async update(id: string, updateSensorDto: UpdateSensorDto): Promise<Sensor> {
    await this.sensorRepository.update(id, updateSensorDto);
    const updatedSensor = await this.findOne(id);
    if (!updatedSensor) {
      throw new Error(`Sensor with ID ${id} not found`);
    }
    return updatedSensor;
  }

  async remove(id: string): Promise<void> {
    await this.sensorRepository.delete(id);
  }
}
