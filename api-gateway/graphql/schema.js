const { gql } = require('graphql-tag');

const typeDefs = gql`
  type Student {
    id: String
    name: String
    email: String
  }

  type Course {
    id: String
    title: String
    description: String
  }

  type Query {
    getAllStudents: [Student]
    getStudentById(id: String!): Student
    getCourseById(id: String!): Course
    getAllCourses: [Course]
  }

 type Mutation {
  createStudent(name: String!, email: String!): Student
  updateStudent(id: ID!, name: String!, email: String!): Student
  deleteStudent(id: ID!): Student

  createCourse(title: String!, description: String!): Course
  updateCourse(id: ID!, title: String!, description: String!): Course
  deleteCourse(id: ID!): Course
}
`;

module.exports = typeDefs;
