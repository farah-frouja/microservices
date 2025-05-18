const { Kafka } = require('kafkajs');

const kafka = new Kafka({ brokers: ['localhost:9092'] });
const consumer = kafka.consumer({ groupId: 'student-group' });

async function runConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'student-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`📩 Received message: ${message.value.toString()}`);
    },
  });
}

runConsumer().catch(console.error);
