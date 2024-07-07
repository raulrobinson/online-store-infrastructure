import { Body, Controller, Get, Post } from '@nestjs/common';
import { KafkaConsumerService } from './kafka.consumer.service';
import { KafkaProducerService } from './kafka.producer.service';

@Controller('kafka')
export class KafkaController {
  constructor(
    private readonly consumerService: KafkaConsumerService,
    private readonly producerService: KafkaProducerService
  ) {}

  @Post('send')
  async sendMessage(@Body('message') message: string) {
    await this.producerService.sendMessage('realtime-topic', message);
    return { message: 'Message sent' };
  }

  @Get('messages')
  async getMessages() {
    const message = await this.consumerService.getLastMessage();
    return { message };
  }
}
