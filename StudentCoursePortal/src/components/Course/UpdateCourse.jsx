// src/components/Course/UpdateCourse.jsx
import React, { useState } from 'react';
import { updateCourse } from '../../api/api';

function UpdateCourse({ courseId, onCourseUpdated }) {
  const [section, setSection] = useState('');
  const [semester, setSemester] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCourse(courseId, { section, semester }, token);
      onCourseUpdated();
      alert('Course updated successfully');
      setSection('');
      setSemester('');
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  return (
    <div>
      <h2>Update Course</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="New Section"
          value={section}
          onChange={(e) => setSection(e.target.value)}
        />
        <input
          type="text"
          placeholder="New Semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        />
        <button type="submit">Update Course</button>
      </form>
    </div>
  );
}

export default UpdateCourse;
