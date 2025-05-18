const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'course-service',
  brokers: ['localhost:9092'] // change si ton broker n'est pas local
});

const producer = kafka.producer();

const produceCourseCreatedEvent = async (course) => {
  try {
    await producer.connect();
    await producer.send({
      topic: 'courses-topic',
      messages: [
        {
          key: course.id,
          value: JSON.stringify(course)
        }
      ]
    });
    console.log(`[Kafka] 🟢 Course created: ${course.title}`);
    await producer.disconnect();
  } catch (error) {
    console.error('[Kafka] ❌ Error producing course event:', error);
  }
};

module.exports = { produceCourseCreatedEvent };
