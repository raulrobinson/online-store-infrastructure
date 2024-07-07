import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Kafka } from 'kafkajs';
import { KafkaConsumerService } from './kafka.consumer.service';
import { KafkaController } from './kafka.controller';
import { KafkaProducerService } from './kafka.producer.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [KafkaController],
  providers: [
    KafkaProducerService,
    {
      provide: 'KAFKA_INSTANCE',
      useFactory: async () => {
        return new Kafka({
          clientId: 'realtime-app',
          brokers: ['localhost:9092'],
        });
      },
    },
    KafkaConsumerService,
    {
      provide: 'KAFKA_CLIENT',
      useFactory: async () => {
        return new Kafka({
          clientId: 'realtime-app',
          brokers: ['localhost:9092'],
        });
      },
    },
  ],
})
export class AppModule {}
