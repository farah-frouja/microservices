const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Charger le fichier course.proto
const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, 'course.proto'),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
);

// Charger le package course
const courseProto = grpc.loadPackageDefinition(packageDefinition).course;

// Créer le client gRPC
const client = new courseProto.CourseService(
  'localhost:50052',
  grpc.credentials.createInsecure()
);

// Fonctions CRUD
function getCourseById(id) {
  return new Promise((resolve, reject) => {
    client.GetCourseById({ id }, (err, response) => {
      if (err) reject(err);
      else resolve(response);
    });
  });
}
function getAllCourses() {
  return new Promise((resolve, reject) => {
    client.GetAllCourses({}, (err, response) => {
      if (err) reject(err);
      else resolve(response.courses);
    });
  });
}

function createCourse({ title, description }) {
  return new Promise((resolve, reject) => {
    client.CreateCourse({ title, description }, (err, response) => {
      if (err) reject(err);
      else resolve(response);
    });
  });
}

function updateCourse({ id, title, description }) {
  return new Promise((resolve, reject) => {
    client.UpdateCourse({ id, title, description }, (err, response) => {
      if (err) reject(err);
      else resolve(response);
    });
  });
}

function deleteCourse(id) {
  return new Promise((resolve, reject) => {
    client.deleteCourse({ id }, (err, response) => {
      if (err) reject(err);
      else resolve(response);
    });
  });
}

module.exports = {
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
};
