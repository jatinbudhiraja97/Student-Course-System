// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { getCourses, enrollCourse, dropCourse, updateCourse, getEnrolledCourses, enrollStudentInCourse, getCoursesTakenByStudent, getAllStudents, fetchStudentsByCourse} from '../api/api';
import './Dashboard.css';

function Dashboard() {
  const [courses, setCourses] = useState([]); // Holds all available courses
  const [enrolledCourses, setEnrolledCourses] = useState([]); // Holds student's enrolled courses
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showDropCourseModal, setShowDropCourseModal] = useState(false);
  const [showUpdateCourseModal, setShowUpdateCourseModal] = useState(false);
  const [showListCoursesModal, setShowListCoursesModal] = useState(false);
  const [showEnrollCourseModal, setShowEnrollCourseModal] = useState(false); // New state for enroll course modal
  const [showCoursesModal, setShowCoursesModal] = useState(false);
  const [selectedCourseCode, setSelectedCourseCode] = useState('');
  const [showStudentsModal, setShowStudentsModal] = useState(false);
  const [showStudentsInCourseModal, setShowStudentsInCourseModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [studentsInCourse, setStudentsInCourse] = useState([]);
  const [students, setStudents] = useState([]);
  const [newCourse, setNewCourse] = useState({
    courseCode: '',
    courseName: '',
    section: '',
    semester: '',
  });
  const [updateCourseData, setUpdateCourseData] = useState({
    courseCode: '',
    section: '',
    semester: '',
  });
  const [enrollCourseData, setEnrollCourseData] = useState({
    courseId: '',
  }); // State to hold the course ID for enrollment
  const token = localStorage.getItem('token');
  const studentId = localStorage.getItem('studentId'); // Ensure studentId is stored after login

  // Fetch all available courses once when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses(token);
        console.log("Fetched courses:", response.data);
        if (response.data.data && response.data.data.getAllCourses) {
          setCourses(response.data.data.getAllCourses); // Update state with the courses fetched from backend
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [token]);


    // Fetch all courses taken by the student
    const fetchCoursesTakenByStudent = async () => {
        const token = localStorage.getItem('token');
        const studentId = localStorage.getItem('studentId');
        console.log("Student ID:", studentId, "Token:", token);
    
        try {
            const response = await getCoursesTakenByStudent(studentId, token);
            if (response.data.data && response.data.data.getCoursesTakenByStudent) {
                setEnrolledCourses(response.data.data.getCoursesTakenByStudent.courses);
                setShowCoursesModal(true);
            } else {
                console.error("No data returned for courses.");
            }
        } catch (error) {
            console.error('Error fetching courses taken by student:', error);
        }
    };

    // Fetch students enrolled in the selected course
    const fetchStudentsInSelectedCourse = async () => {
        if (!selectedCourse) {
          alert("Please select a course.");
          return;
        }
      
        console.log("Selected Course Code:", selectedCourse); // Debugging line
      
        try {
          const response = await fetchStudentsByCourse(selectedCourse, token);
          if (response.data.data && response.data.data.getStudentsByCourse) {
            setStudentsInCourse(response.data.data.getStudentsByCourse);
            setShowStudentsInCourseModal(true);
          } else {
            console.error("No students found for the selected course.");
          }
        } catch (error) {
          console.error("Error fetching students in course:", error);
        }
      };
      

    const fetchAllStudents = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await getAllStudents(token);
          console.log("API response:", response.data);  // Debugging line to check the response data
          if (response.data.data && response.data.data.getAllStudents) {
            setStudents(response.data.data.getAllStudents);
            setShowStudentsModal(true);
          } else {
            console.error("No data returned for students.");
          }
        } catch (error) {
          console.error('Error fetching students:', error);
        }
      };
    
      

  // Fetch enrolled courses for the student when "List of Courses" is clicked
  const fetchEnrolledCourses = async () => {
    try {
      const response = await getEnrolledCourses(studentId, token);
      console.log("Fetched enrolled courses:", response.data);
      if (response.data.data && response.data.data.getStudentCourses) {
        setEnrolledCourses(response.data.data.getStudentCourses.courses);
        setShowListCoursesModal(true); // Show modal only after data is fetched
      }
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
    }
  };

  // Handle adding a new course
  const handleAddCourse = async () => {
    const { courseCode, courseName, section, semester } = newCourse;
    try {
      const response = await enrollCourse(courseCode, courseName, section, semester, token);
      console.log("Add course response:", response.data);
      if (response.data.data && response.data.data.addCourse) {
        setEnrolledCourses((prev) => [...prev, response.data.data.addCourse]);
        alert("Course added successfully");
        setShowAddCourseModal(false);
      } else {
        alert("Failed to add course.");
      }
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

// Function to handle dropping a course
// Function to handle dropping a course and updating UI
const handleDropCourse = async (courseId) => {
  try {
    const response = await dropCourse(studentId, courseId, token);  // Pass courseId instead
    console.log("Drop course response:", response.data);
    if (response.data.data && response.data.data.dropCourse) {
      setEnrolledCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== courseId) // Update the state by removing the dropped course by id
      );
      alert("Course dropped successfully");
      setShowDropCourseModal(false);
    } else {
      alert("Failed to drop course.");
    }
  } catch (error) {
    console.error('Error dropping course:', error);
  }
};




  // Handle updating a course
  const handleUpdateCourse = async () => {
    const { courseCode, section, semester } = updateCourseData;
    try {
      const response = await updateCourse(courseCode, section, semester, token);
      console.log("Update course response:", response.data);
      if (response.data.data && response.data.data.updateCourse) {
        alert("Course updated successfully");
        setShowUpdateCourseModal(false);
      } else {
        alert("Failed to update course.");
      }
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleEnrollCourse = async () => {
    const studentId = localStorage.getItem('studentId'); // Fetch it directly
    const token = localStorage.getItem('token'); // Fetch token similarly if needed
  
    if (!studentId) {
      alert("Student ID is not available. Please log in again.");
      return;
    }
  
    if (!selectedCourseCode) {
      alert("Please select a course to enroll.");
      return;
    }
  
    console.log(`Enrolling student with studentId = ${studentId} into courseCode = ${selectedCourseCode}`);
    try {
      const response = await enrollStudentInCourse(studentId, selectedCourseCode, token);
      console.log("Enroll course response:", response.data);
      if (response.data.data && response.data.data.enrollStudent) {
        alert("Enrolled in course successfully");
        setShowEnrollCourseModal(false);
      } else {
        alert("Failed to enroll in course.");
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };
  
  

  // Handle input change for adding a new course
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prevCourse) => ({ ...prevCourse, [name]: value }));
  };

  // Handle input change for updating a course
  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateCourseData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle input change for enrolling in a course
  const handleEnrollInputChange = (e) => {
    const { name, value } = e.target;
    setEnrollCourseData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
<div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="cards-container">
        {/* Existing cards */}
        <div className="card" onClick={() => setShowAddCourseModal(true)}>
          <h3>Add Course</h3>
          <p>Add a new course to your schedule.</p>
        </div>
        <div className="card" onClick={() => setShowDropCourseModal(true)}>
          <h3>Drop Course</h3>
          <p>Remove a course from your schedule.</p>
        </div>
        <div className="card" onClick={() => setShowUpdateCourseModal(true)}>
          <h3>Update Course</h3>
          <p>Update details of an existing course.</p>
        </div>
        <div className="card" onClick={() => setShowListCoursesModal(true)}>
          <h3>List of Courses</h3>
          <p>View all available courses.</p>
        </div>
        <div className="card" onClick={() => setShowEnrollCourseModal(true)}>
          <h3>Enroll in Course</h3>
          <p>Enroll in an available course.</p>
        </div>
        <div className="card" onClick={fetchCoursesTakenByStudent}>
          <h3>List of Courses Taken</h3>
          <p>View all courses you are enrolled in.</p>
        </div>
        <div className="card" onClick={fetchAllStudents}>
          <h3>List of All Students</h3>
          <p>View a list of all students in the database.</p>
        </div>
        {/* New Card for Listing Students in a Selected Course */}
        <div className="card" onClick={() => setShowStudentsInCourseModal(true)}>
          <h3>List Students in Course</h3>
          <p>Select a course to view enrolled students.</p>
        </div>
      </div>

      {/* Modal for adding a course */}
      {showAddCourseModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add a Course</h3>
            <input type="text" name="courseCode" placeholder="Course Code" value={newCourse.courseCode} onChange={handleInputChange} />
            <input type="text" name="courseName" placeholder="Course Name" value={newCourse.courseName} onChange={handleInputChange} />
            <input type="text" name="section" placeholder="Section" value={newCourse.section} onChange={handleInputChange} />
            <input type="text" name="semester" placeholder="Semester" value={newCourse.semester} onChange={handleInputChange} />
            <button onClick={handleAddCourse}>Add Course</button>
            <button onClick={() => setShowAddCourseModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Modal for displaying the list of all students */}
    {showStudentsModal && (
      <div className="modal">
        <div className="modal-content">
          <h3>All Students</h3>
          {students.length > 0 ? (
            <ul>
              {students.map((student) => (
                <li key={student.id}>
                  {student.firstName} {student.lastName} - {student.email}
                </li>
              ))}
            </ul>
          ) : (
            <p>No students found.</p>
          )}
          <button onClick={() => setShowStudentsModal(false)}>Close</button>
        </div>
      </div>
    )}

    {/* Modal for selecting a course and showing students */}
{/* Modal for selecting a course and showing students */}
{showStudentsInCourseModal && (
  <div className="modal">
    <div className="modal-content">
      <h3>Students in Selected Course</h3>
      <div className="select-course-container">
        <label htmlFor="courseSelect">Select a course:</label>
        <select 
          id="courseSelect" 
          className="course-select"
          onChange={(e) => setSelectedCourse(e.target.value)} 
          value={selectedCourse}
        >
          <option value="">Choose a course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.courseCode} - {course.courseName}
            </option>
          ))}
        </select>
      </div>
      <div className="button-container">
        <button className="fetch-button" onClick={fetchStudentsInSelectedCourse}>Fetch Students</button>
        <button className="close-button" onClick={() => setShowStudentsInCourseModal(false)}>Close</button>
      </div>
      {studentsInCourse.length > 0 && (
        <ul className="student-list">
          {studentsInCourse.map((student) => (
            <li key={student.id}>
              <span>{student.firstName} {student.lastName}</span> - <span>{student.email}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
)}

    {/* Modal for enrolling in a course */}
    {showEnrollCourseModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Enroll in a Course</h3>
            <select
              value={selectedCourseCode}
              onChange={(e) => setSelectedCourseCode(e.target.value)}
            >
              <option value="">Select a Course</option>
              {courses.map((course) => (
                <option key={course.courseCode} value={course.courseCode}>
                  {course.courseCode} - {course.courseName}
                </option>
              ))}
            </select>
            <button onClick={handleEnrollCourse}>Enroll</button>
            <button onClick={() => setShowEnrollCourseModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Modal for displaying courses taken by student */}
      {showCoursesModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Courses Taken</h3>
            {enrolledCourses.length > 0 ? (
              <ul>
                {enrolledCourses.map((course) => (
                  <li key={course._id}>
                    <strong>{course.courseCode}</strong>: {course.courseName} - {course.section}, {course.semester}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No courses taken.</p>
            )}
            <button onClick={() => setShowCoursesModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Modal for dropping a course */}
      {showDropCourseModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Drop a Course</h3>
            {enrolledCourses.length > 0 ? (
              enrolledCourses.map((course) => (
                <div key={course.id} className="course-item">
                  <span>{course.courseCode} - {course.courseName}</span>
                  <button onClick={() => handleDropCourse(course.id)}>Drop</button>
                </div>
              ))
            ) : (
              <p>No courses enrolled.</p>
            )}
            <button onClick={() => setShowDropCourseModal(false)}>Cancel</button>
          </div>
        </div>
      )}


      {/* Modal for updating a course */}
      {showUpdateCourseModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Update a Course</h3>
            <input type="text" name="courseCode" placeholder="Course Code" value={updateCourseData.courseCode} onChange={handleUpdateInputChange} />
            <input type="text" name="section" placeholder="New Section" value={updateCourseData.section} onChange={handleUpdateInputChange} />
            <input type="text" name="semester" placeholder="New Semester" value={updateCourseData.semester} onChange={handleUpdateInputChange} />
            <button onClick={handleUpdateCourse}>Update Course</button>
            <button onClick={() => setShowUpdateCourseModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Modal for displaying all courses */}
      {showListCoursesModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>List of Available Courses</h3>
            {courses.length > 0 ? (
              <ul>
                {courses.map((course) => (
                  <li key={course.id}>
                    <strong>{course.courseCode}</strong>: {course.courseName} - {course.section}, {course.semester}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No courses available.</p>
            )}
            <button onClick={() => setShowListCoursesModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
