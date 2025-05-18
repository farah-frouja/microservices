import { Kafka } from 'kafkajs';
import { config } from '../config/config.js';

const kafka = new Kafka({ brokers: config.kafkaBrokers });
const consumer = kafka.consumer({ groupId: 'course-group' });

export async function startKafkaConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'course-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const value = message.value.toString();
      console.log('📥 Course consumed:', value);
    },
  });
}
