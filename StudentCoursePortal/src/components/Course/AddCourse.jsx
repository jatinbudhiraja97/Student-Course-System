// src/components/Course/AddCourse.jsx
import React, { useState } from 'react';
import { addCourse } from '../../api/api';

function AddCourse({ onCourseAdded }) {
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [section, setSection] = useState('');
  const [semester, setSemester] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCourse({ courseCode, courseName, section, semester }, token);
      onCourseAdded();
      alert('Course added successfully');
      setCourseCode('');
      setCourseName('');
      setSection('');
      setSemester('');
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  return (
    <div>
      <h2>Add Course</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Course Code"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Section"
          value={section}
          onChange={(e) => setSection(e.target.value)}
        />
        <input
          type="text"
          placeholder="Semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        />
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
}

export default AddCourse;
