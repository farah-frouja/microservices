const config = {
  restPort: 3001,
  grpcPort: 50051,
  kafkaBrokers: ['localhost:9092'],
  kafkaTopic: 'student-topic'
};

module.exports = { config };
