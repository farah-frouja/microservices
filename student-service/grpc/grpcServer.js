const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const { Student } = require('../models/Student');
const { config } = require('../config/config');
const { produceStudentCreatedEvent } = require('../kafka/kafkaProducer');

const students = [
  new Student('1', 'Alice', 'alice@example.com'),
  new Student('2', 'Bob', 'bob@example.com')
];

const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, 'student.proto'),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
);

const proto = grpc.loadPackageDefinition(packageDefinition).student;

// ✅ Get all students
function getAllStudents(call, callback) {
  callback(null, { students });
}

// ✅ Get student by ID
function getStudentById(call, callback) {
  const student = students.find(s => s.id === call.request.id);
  if (student) {
    callback(null, student);
  } else {
    callback(new Error('Student not found'));
  }
}

// ✅ Create student
function createStudent(call, callback) {
  const { name, email } = call.request;
  const newStudent = new Student(String(students.length + 1), name, email);
  students.push(newStudent);
  produceStudentCreatedEvent(newStudent); // ✅ produire l’événement Kafka

  callback(null, newStudent);
}

// ✅ Update student
function updateStudent(call, callback) {
  const { id, name, email } = call.request;
  const student = students.find(s => s.id === id);
  if (student) {
    student.name = name;
    student.email = email;
    callback(null, student);
  } else {
    callback(null, null);
  }
}

// ✅ Delete student
function deleteStudent(call, callback) {
  const index = students.findIndex(s => s.id === call.request.id);
  if (index !== -1) {
    const removed = students.splice(index, 1)[0];
    callback(null, removed);
  } else {
    callback(null, null);
  }
}

// ✅ Lancer le serveur gRPC
function startGrpcServer() {
  const server = new grpc.Server();
  server.addService(proto.StudentService.service, {
    GetStudentById: getStudentById,
    GetAllStudents: getAllStudents,
    CreateStudent: createStudent,
    UpdateStudent: updateStudent,
    DeleteStudent: deleteStudent
  });

  server.bindAsync(
    `0.0.0.0:${config.grpcPort}`,
    grpc.ServerCredentials.createInsecure(),
    () => {
      console.log(`✅ gRPC server running on port ${config.grpcPort}`);
      server.start();
    }
  );
}

module.exports = startGrpcServer;
