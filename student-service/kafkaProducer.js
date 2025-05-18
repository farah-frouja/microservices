const { Kafka } = require('kafkajs');

const kafka = new Kafka({ brokers: ['localhost:9092'] });
const producer = kafka.producer();

const sendStudentEvent = async (student) => {
  await producer.connect();
  await producer.send({
    topic: 'student-created',
    messages: [{ value: JSON.stringify(student) }],
  });
  await producer.disconnect();
};

module.exports = { sendStudentEvent };
