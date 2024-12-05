// courseResolvers.js
const { GraphQLList, GraphQLNonNull, GraphQLString, GraphQLID } = require('graphql');
const CourseType = require('../CourseType'); // Adjust the path if necessary
const Course = require('../../../models/Course'); // Adjust the path if necessary

const courseResolvers = {
  // Query to fetch all courses
  getAllCourses: {
    type: new GraphQLList(CourseType), // Returns a list of CourseType
    resolve() {
      return Course.find(); // Fetches all courses from the database
    }
  },

  // Mutation to add a course
  addCourse: {
    type: CourseType,
    args: {
      courseCode: { type: new GraphQLNonNull(GraphQLString) },
      courseName: { type: new GraphQLNonNull(GraphQLString) },
      section: { type: GraphQLString },
      semester: { type: GraphQLString }
    },
    async resolve(parent, args) {
      const course = new Course({
        courseCode: args.courseCode,
        courseName: args.courseName,
        section: args.section,
        semester: args.semester
      });
      return await course.save();
    }
  },

  // Mutation to update a course
  updateCourse: {
    type: CourseType,
    args: {
      courseCode: { type: new GraphQLNonNull(GraphQLString) },
      section: { type: new GraphQLNonNull(GraphQLString) },
      semester: { type: GraphQLString }
    },
    async resolve(parent, { courseCode, section, semester }) {
      return Course.findOneAndUpdate(
        { courseCode: courseCode },
        { section: section, semester: semester },
        { new: true }
      );
    }
  },

  // Mutation to delete a course
  deleteCourse: {
    type: CourseType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    async resolve(parent, args) {
      return await Course.findByIdAndRemove(args.id);
    }
  }
};

module.exports = courseResolvers;
