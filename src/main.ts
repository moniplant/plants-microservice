import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PLANTS_CONSUMER_GROUP_ID, SENSORS_CONSUMER_GROUP_ID } from './tokens';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Microservice #1: managing data from sensors
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:29092'],
      },
      consumer: {
        groupId: PLANTS_CONSUMER_GROUP_ID,
      },
    },
  });
  // Microservice #2: managing sensors (Creation, update etc...)
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:29092'],
      },
      consumer: {
        groupId: SENSORS_CONSUMER_GROUP_ID,
      },
    },
  });
  await app.startAllMicroservices();
}
bootstrap();
