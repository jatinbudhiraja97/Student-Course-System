const Student = require('../../../models/Student');
const Course = require('../../../models/Course');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLList } = require('graphql');
const StudentType = require('../StudentType');


const studentResolvers = {
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

  login: {
    type: GraphQLString,
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
      return token;
    }
  },

  enrollStudent: {
    type: StudentType,
    args: {
      studentId: { type: new GraphQLNonNull(GraphQLID) },
      courseCode: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(parent, { studentId, courseCode }) {
      console.log("EnrollStudent Resolver: studentId =", studentId, ", courseCode =", courseCode);
  
      const student = await Student.findById(studentId);
      if (!student) {
        console.log("Student not found");
        throw new Error("Student not found");
      }
  
      const course = await Course.findOne({ courseCode });
      if (!course) {
        console.log("Course not found");
        throw new Error("Course not found");
      }
  
      if (!student.courses.includes(course._id)) {
        student.courses.push(course._id);
        await student.save();
        console.log("Course added to student's courses.");
      } else {
        console.log("Course already enrolled.");
      }
  
      return student;
    }
  },


  getStudentsByCourse: {
    type: new GraphQLList(StudentType),
    args: { courseId: { type: GraphQLID } },
    async resolve(parent, args) {
      try {
        // Assuming `courses` is an array of ObjectIds referencing Course documents in the Student model
        const students = await Student.find({ courses: args.courseId }).populate('courses');
        
        if (!students.length) {
          throw new Error("No students enrolled in this course");
        }
        
        return students;
      } catch (error) {
        console.error("Error fetching students for the course:", error);
        throw new Error("Failed to fetch students for the course");
      }
    }
  },

  getCoursesTakenByStudent: {
    type: StudentType, // Assuming this returns the student's data with a list of courses
    args: { studentId: { type: GraphQLID } },
    async resolve(parent, args) {
      try {
        const student = await Student.findById(args.studentId).populate('courses');
        if (!student) {
          throw new Error("Student not found");
        }
        return student;
      } catch (error) {
        console.error("Error fetching courses for the student:", error);
        throw new Error("Failed to fetch courses for the student");
      }
    },
  },
  
  
  

  getAllStudents: {
    type: new GraphQLList(StudentType),
    resolve: async () => {
      try {
        return await Student.find();
      } catch (err) {
        throw new Error("Failed to fetch students");
      }
    },
  },


  dropCourse: {
    type: StudentType,
    args: {
      studentId: { type: new GraphQLNonNull(GraphQLID) },
      courseId: { type: new GraphQLNonNull(GraphQLID) }  // Change to courseId
    },
    async resolve(parent, { studentId, courseId }) {
      // Find the student by ID
      const student = await Student.findById(studentId);
      if (!student) {
        throw new Error("Student not found");
      }
  
      // Check if the course exists in the student's courses array
      const courseExists = student.courses.some(
        (course) => course.equals(courseId)  // Compare by ObjectId
      );
  
      if (!courseExists) {
        throw new Error("Course not found in student's enrolled courses");
      }
  
      // Remove the course by filtering it out of the courses array
      student.courses = student.courses.filter(
        (course) => !course.equals(courseId)  // Filter by ObjectId
      );
  
      // Save the updated student document
      await student.save();
  
      return student; // Return the updated student document
    }
  }
  
  
};



module.exports = studentResolvers;
