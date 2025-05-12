import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
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
      plantId: createSensorEvent.plant_id,
      quantity: createSensorEvent.quantity,
      unit: createSensorEvent.unit,
    });
  }

  @MessagePattern(LIST_PLANT_SENSORS)
  findAll(@Payload() plantId: { id: string }) {
    return this.sensorService.findAll(plantId.id);
  }

  @MessagePattern(RETRIEVE_SENSOR)
  findOne(@Payload() sensorId: { id: string }) {
    return this.sensorService.findOne(sensorId.id);
  }

  @EventPattern(UPDATE_SENSOR)
  update(@Payload() updateSensorEvent: CreateorUpdateSensorEvent) {
    this.sensorService.update(updateSensorEvent.id, {
      label: updateSensorEvent.label,
      plantId: updateSensorEvent.plant_id,
      quantity: updateSensorEvent.quantity,
      unit: updateSensorEvent.unit,
    });
  }

  @EventPattern(DELETE_SENSOR)
  remove(@Payload() id: string) {
    this.sensorService.remove(id);
  }
}
