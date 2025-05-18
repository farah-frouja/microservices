const studentClient = require('../grpc/studentClient');
const courseClient = require('../grpc/courseClient');

module.exports = {
  Query: {
    getStudentById: async (_, args) => {
      return await studentClient.getStudentById(args.id);
    },
      getAllStudents: async () => {
      return await studentClient.getAllStudents();
    },
    getCourseById: async (_, args) => {
      return await courseClient.getCourseById(args.id);
    },
    
    getAllCourses: async () => {
    try {
    return await courseClient.getAllCourses();
  } catch (err) {
    throw new Error(err.message);
  }
},

  },

  Mutation: {
    createStudent: async (_, { name, email }) => {
      return await studentClient.createStudent(name, email);
    },
    updateStudent: async (_, { id, name, email }) => {
      return await studentClient.updateStudent(id, name, email);
    },
    deleteStudent: async (_, { id }) => {
      return await studentClient.deleteStudent(id);
    },
    createCourse: async (_, { title, description }) => {
      return await courseClient.createCourse({ title, description });
    },
    updateCourse: async (_, { id, title, description }) => {
      return await courseClient.updateCourse({ id, title, description });
    },
    deleteCourse: async (_, { id }) => {
      return await courseClient.deleteCourse(id);
    },
    
  }
};
