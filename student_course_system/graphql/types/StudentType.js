const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = require('graphql');
const Course = require('../../models/Course');

const StudentType = new GraphQLObjectType({
  name: 'Student',
  fields: () => {
    const CourseType = require('./CourseType');  // Move import here
    return {
      id: { type: GraphQLID },
      studentNumber: { type: GraphQLString },
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      address: { type: GraphQLString },
      city: { type: GraphQLString },
      phoneNumber: { type: GraphQLString },
      email: { type: GraphQLString },
      program: { type: GraphQLString },
      courses: {
        type: new GraphQLList(CourseType),
        resolve(parent, args) {
          return Course.find({ _id: { $in: parent.courses } });
        }
      }
    };
  }
});

module.exports = StudentType;
