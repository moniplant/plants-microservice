import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SensorService } from './sensor.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import {
  CREATE_SENSOR,
  DELETE_SENSOR,
  LIST_PLANT_SENSORS,
  RETRIEVE_SENSOR,
  UPDATE_SENSOR,
} from '../events';

@Controller()
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @MessagePattern(CREATE_SENSOR)
  create(@Payload() createSensorDto: CreateSensorDto) {
    return this.sensorService.create(createSensorDto);
  }

  @MessagePattern(LIST_PLANT_SENSORS)
  findAll() {
    return this.sensorService.findAll();
  }

  @MessagePattern(RETRIEVE_SENSOR)
  findOne(@Payload() id: number) {
    return this.sensorService.findOne(id);
  }

  @MessagePattern(UPDATE_SENSOR)
  update(@Payload() updateSensorDto: UpdateSensorDto) {
    return this.sensorService.update(updateSensorDto.id, updateSensorDto);
  }

  @MessagePattern(DELETE_SENSOR)
  remove(@Payload() id: number) {
    return this.sensorService.remove(id);
  }
}
