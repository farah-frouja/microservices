const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const { config } = require('../config/config');
const { produceCourseCreatedEvent } = require('../kafka/kafkaProducer');

// Données en mémoire
const courses = [
  { id: '1', title: 'Node.js', description: 'Learn backend with Node' },
  { id: '2', title: 'gRPC', description: 'Learn RPC communication' }
];

// Charger le fichier course.proto avec support des types Google
const PROTO_PATH = path.join(__dirname, 'course.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
  includeDirs: [
    __dirname,
    path.resolve(__dirname, '../../node_modules/google-proto-files') // important pour Empty
  ]
});

const proto = grpc.loadPackageDefinition(packageDefinition).course;

// Méthodes gRPC

function getCourseById(call, callback) {
  const course = courses.find(c => c.id === call.request.id);
  if (course) {
    callback(null, course);
  } else {
    callback(new Error('Course not found'));
  }
}

function createCourse(call, callback) {
  const { title, description } = call.request;
  const newCourse = {
    id: String(courses.length + 1),
    title,
    description
  };
  courses.push(newCourse);
  produceCourseCreatedEvent(newCourse); 
  callback(null, newCourse);
}

function updateCourse(call, callback) {
  const { id, title, description } = call.request;
  const course = courses.find(c => c.id === id);
  if (course) {
    course.title = title;
    course.description = description;
    callback(null, course);
  } else {
    callback(new Error('Course not found'));
  }
}

function deleteCourse(call, callback) {
  const index = courses.findIndex(c => c.id === call.request.id);
  if (index !== -1) {
    const deleted = courses.splice(index, 1)[0];
    callback(null, deleted);
  } else {
    callback(new Error('Course not found'));
  }
}

function getAllCourses(call, callback) {
  callback(null, { courses });
}

// Lancer le serveur gRPC
function startGrpcServer() {
  const server = new grpc.Server();
  server.addService(proto.CourseService.service, {
    GetCourseById: getCourseById,
    CreateCourse: createCourse,
    UpdateCourse: updateCourse,
    DeleteCourse: deleteCourse,
    GetAllCourses: getAllCourses,
  });

  server.bindAsync(`0.0.0.0:${config.grpcPort}`, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`✅ gRPC server running on port ${config.grpcPort}`);
    server.start();
  });
}

module.exports = startGrpcServer;
