// src/api/api.js
import axios from 'axios';

const API_URL = 'http://localhost:4000/graphql';

export const registerStudent = (studentData) => {
  return axios.post(API_URL, {
    query: `
      mutation {
        registerStudent(studentNumber: "${studentData.studentNumber}", password: "${studentData.password}", firstName: "${studentData.firstName}", lastName: "${studentData.lastName}", address: "${studentData.address}", city: "${studentData.city}", phoneNumber: "${studentData.phoneNumber}", email: "${studentData.email}", program: "${studentData.program}") {
          id
          firstName
          lastName
          email
        }
      }
    `,
  });
};

export const loginStudent = (email, password) => {
    return axios.post(API_URL, {
      query: `
        mutation {
          loginStudent(email: "${email}", password: "${password}") {
            token
            studentId
          }
        }
      `,
    });
  };
  
  

export const getCourses = (token) => {
  return axios.post(
    API_URL,
    {
      query: `
        {
          getAllCourses {
            id
            courseCode
            courseName
            section
            semester
          }
        }
      `,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

// Leave enrollCourse function as it is since it's working fine.
export const enrollCourse = (courseCode, courseName, section, semester, token) => {
    return axios.post(
      API_URL,
      {
        query: `
          mutation {
            addCourse(courseCode: "${courseCode}", courseName: "${courseName}", section: "${section}", semester: "${semester}") {
              id
              courseCode
              courseName
              section
              semester
            }
          }
        `,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };
  

// Function to fetch the list of enrolled courses for a specific student
export const getEnrolledCourses = (studentId, token) => {
  return axios.post(
    API_URL,
    {
      query: `
        query {
          getStudentCourses(studentId: "${studentId}") {
            courses {
              id
              courseCode
              courseName
              section
              semester
            }
          }
        }
      `,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

// Updated dropCourse to accept courseCode and pass token correctly
export const dropCourse = (studentId, courseId, token) => {
  return axios.post(
    API_URL,
    {
      query: `
        mutation {
          dropCourse(studentId: "${studentId}", courseId: "${courseId}") {
            id
            courses {
              courseCode
              courseName
            }
          }
        }
      `
    },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
};




  
export const updateCourse = (courseCode, section, semester, token) => {
    return axios.post(
      API_URL,
      {
        query: `
          mutation {
            updateCourse(courseCode: "${courseCode}", section: "${section}", semester: "${semester}") {
              id
              courseCode
              courseName
              section
              semester
            }
          }
        `,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };
  

  export const enrollStudentInCourse = (studentId, courseCode, token) => {
    console.log("API call to enroll student: studentId =", studentId, ", courseCode =", courseCode);
    return axios.post(
      API_URL,
      {
        query: `
          mutation {
            enrollStudent(studentId: "${studentId}", courseCode: "${courseCode}") {
              id
              firstName
              lastName
              courses {
                courseCode
                courseName
              }
            }
          }
        `,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };
  
export const getCoursesTakenByStudent = (studentId, token) => {
  return axios.post(
    API_URL,
    {
      query: `
        query getCoursesByStudent($studentId: ID!) {
          getCoursesTakenByStudent(studentId: $studentId) {
            courses {
              id
              courseCode
              courseName
              section
              semester
            }
          }
        }
      `,
      variables: {
        studentId: studentId
      }
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const getAllStudents = (token) => {
    return axios.post(
      API_URL,
      {
        query: `
          query {
            getAllStudents {
              id
              firstName
              lastName
              email
              studentNumber
            }
          }
        `,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };


  export const fetchStudentsByCourse = (courseId, token) => {
    return axios.post(
      API_URL,
      {
        query: `
          query getStudentsByCourse($courseId: ID!) {
            getStudentsByCourse(courseId: $courseId) {
              id
              firstName
              lastName
              email
            }
          }
        `,
        variables: { courseId },
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };
  

  
  



  
  
  
  
  
