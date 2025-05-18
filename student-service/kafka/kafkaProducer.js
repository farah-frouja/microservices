const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'student-service',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

const produceStudentCreatedEvent = async (student) => {
  await producer.connect();
  await producer.send({
    topic: 'students-topic',
    messages: [
      {
        key: student.id,
        value: JSON.stringify(student)
      }
    ]
  });
  await producer.disconnect();
};

module.exports = { produceStudentCreatedEvent };
