const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID } = require('graphql');
const Student = require('../../../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const StudentType = require('../StudentType');

const LoginResponseType = new GraphQLObjectType({
  name: 'LoginResponse',
  fields: {
    token: { type: new GraphQLNonNull(GraphQLString) },
    studentId: { type: new GraphQLNonNull(GraphQLID) }
  }
});

const authResolvers = {
  registerStudent: {
    type: StudentType,
    args: {
      studentNumber: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
      firstName: { type: new GraphQLNonNull(GraphQLString) },
      lastName: { type: new GraphQLNonNull(GraphQLString) },
      address: { type: GraphQLString },
      city: { type: GraphQLString },
      phoneNumber: { type: GraphQLString },
      email: { type: new GraphQLNonNull(GraphQLString) },
      program: { type: GraphQLString }
    },
    async resolve(parent, args) {
      const existingStudent = await Student.findOne({ email: args.email });
      if (existingStudent) {
        throw new Error('Student with this email already exists');
      }

      const hashedPassword = await bcrypt.hash(args.password, 10);
      const student = new Student({
        studentNumber: args.studentNumber,
        password: hashedPassword,
        firstName: args.firstName,
        lastName: args.lastName,
        address: args.address,
        city: args.city,
        phoneNumber: args.phoneNumber,
        email: args.email,
        program: args.program
      });

      return student.save();
    }
  },

  loginStudent: {
    type: LoginResponseType, // Now `LoginResponseType` is defined and can be used here
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(parent, { email, password }) {
      const student = await Student.findOne({ email });
      if (!student) {
        throw new Error('Student not found');
      }

      const isMatch = await bcrypt.compare(password, student.password);
      if (!isMatch) {
        throw new Error('Incorrect password');
      }

      const token = jwt.sign({ id: student.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return { token, studentId: student.id }; // Return both token and studentId
    }
  }
};

module.exports = authResolvers;
