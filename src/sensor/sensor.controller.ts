import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SensorService } from './sensor.service';
import {
  CREATE_SENSOR,
  DELETE_SENSOR,
  LIST_PLANT_SENSORS,
  RETRIEVE_SENSOR,
  UPDATE_SENSOR,
} from '../events';
import { CreateorUpdateSensorEvent } from './events/create-or-update-sensor.event';

@Controller()
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @MessagePattern(CREATE_SENSOR)
  create(@Payload() createSensorEvent: CreateorUpdateSensorEvent) {
    return this.sensorService.create({
      id: createSensorEvent.id,
      label: createSensorEvent.label,
      plant_id: createSensorEvent.plant_id,
      quantity: createSensorEvent.quantity,
      unit: createSensorEvent.unit,
    });
  }

  @MessagePattern(LIST_PLANT_SENSORS)
  findAll() {
    return this.sensorService.findAll();
  }

  @MessagePattern(RETRIEVE_SENSOR)
  findOne(@Payload() id: string) {
    return this.sensorService.findOne(id);
  }

  @MessagePattern(UPDATE_SENSOR)
  update(@Payload() updateSensorEvent: CreateorUpdateSensorEvent) {
    return this.sensorService.update(updateSensorEvent.id, {
      label: updateSensorEvent.label,
      plant_id: updateSensorEvent.plant_id,
      quantity: updateSensorEvent.quantity,
      unit: updateSensorEvent.unit,
    });
  }

  @MessagePattern(DELETE_SENSOR)
  remove(@Payload() id: string) {
    return this.sensorService.remove(id);
  }
}
