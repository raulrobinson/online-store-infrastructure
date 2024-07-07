import { Injectable, Inject } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaProducerService {
  private producer: Producer;

  constructor(@Inject('KAFKA_INSTANCE') private kafka: Kafka) {
    this.producer = this.kafka.producer();
    this.connect();
  }

  async connect() {
    await this.producer.connect();
  }

  async sendMessage(topic: string, message: string): Promise<void> {
    try {
      await this.producer.send({
        topic: 'realtime',
        messages: [{ value: message }],
      });
      console.log(`Message sent successfully to topic ${topic}`);
    } catch (error) {
      console.error(`Error sending message to topic ${topic}: ${error.message}`);
      throw error;
    }
  }

  async disconnect() {
    await this.producer.disconnect();
  }
}
