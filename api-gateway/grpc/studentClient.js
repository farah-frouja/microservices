const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, 'student.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const studentProto = grpc.loadPackageDefinition(packageDefinition).student;

const client = new studentProto.StudentService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

// 🔍 Get student by ID
function getStudentById(id) {
  return new Promise((resolve, reject) => {
    client.getStudentById({ id }, (err, response) => {
      if (err) reject(err);
      else resolve(response);
    });
  });
}

// 📄 Get all students
function getAllStudents() {
  return new Promise((resolve, reject) => {
    client.getAllStudents({}, (err, response) => {
      if (err) reject(err);
      else resolve(response.students);
    });
  });
}

// ➕ Create student
function createStudent(name, email) {
  return new Promise((resolve, reject) => {
    client.createStudent({ name, email }, (err, response) => {
      if (err) reject(err);
      else resolve(response);
    });
  });
}

// ✏️ Update student
function updateStudent(id, name, email) {
  return new Promise((resolve, reject) => {
    client.updateStudent({ id, name, email }, (err, response) => {
      if (err) reject(err);
      else resolve(response);
    });
  });
}

// ❌ Delete student
function deleteStudent(id) {
  return new Promise((resolve, reject) => {
    client.deleteStudent({ id }, (err, response) => {
      if (err) reject(err);
      else resolve(response);
    });
  });
}

module.exports = {
  getStudentById,
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent
};
