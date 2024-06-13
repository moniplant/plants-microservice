import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SensorService } from './sensor.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';

@Controller()
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @MessagePattern('createSensor')
  create(@Payload() createSensorDto: CreateSensorDto) {
    return this.sensorService.create(createSensorDto);
  }

  @MessagePattern('findAllSensor')
  findAll() {
    return this.sensorService.findAll();
  }

  @MessagePattern('findOneSensor')
  findOne(@Payload() id: number) {
    return this.sensorService.findOne(id);
  }

  @MessagePattern('updateSensor')
  update(@Payload() updateSensorDto: UpdateSensorDto) {
    return this.sensorService.update(updateSensorDto.id, updateSensorDto);
  }

  @MessagePattern('removeSensor')
  remove(@Payload() id: number) {
    return this.sensorService.remove(id);
  }
}
