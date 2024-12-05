const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = require('graphql');
const Student = require('../../models/Student');

const CourseType = new GraphQLObjectType({
  name: 'Course',
  fields: () => {
    const StudentType = require('./StudentType');  // Move import here
    return {
      id: { type: GraphQLID },
      courseCode: { type: GraphQLString },
      courseName: { type: GraphQLString },
      section: { type: GraphQLString },
      semester: { type: GraphQLString },
      students: {
        type: new GraphQLList(StudentType),
        resolve(parent, args) {
          return Student.find({ courses: parent.id });
        }
      }
    };
  }
});

module.exports = CourseType;
