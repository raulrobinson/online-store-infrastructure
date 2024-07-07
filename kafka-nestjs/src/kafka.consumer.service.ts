import { Injectable, Inject } from '@nestjs/common';
import { Kafka, Consumer, KafkaMessage } from 'kafkajs';

@Injectable()
export class KafkaConsumerService {
  private consumer: Consumer;
  private lastMessage: string | null = null;

  constructor(@Inject('KAFKA_CLIENT') private kafka: Kafka) {
    this.consumer = this.kafka.consumer({ groupId: 'realtime-group' });
    this.start();
  }

  async start() {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'realtime', fromBeginning: true });
    await this.consumer.run({
      eachMessage: async ({ message }: { message: KafkaMessage }) => {
        console.log('Received message:', message.value.toString());
        this.lastMessage = message.value.toString();
      },
    });
  }

  async getLastMessage(): Promise<string | null> {
    return new Promise<string | null>((resolve) => {
      if (this.lastMessage !== null) {
        resolve(this.lastMessage);
      } else {
        const interval = setInterval(() => {
          if (this.lastMessage !== null) {
            clearInterval(interval);
            resolve(this.lastMessage);
          }
        }, 500);
      }
    });
  }
}
