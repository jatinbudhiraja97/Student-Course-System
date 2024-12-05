// src/components/Course/DropCourse.jsx
import React from 'react';
import { dropCourse } from '../../api/api';

function DropCourse({ studentId, courseId, onCourseDropped }) {
  const token = localStorage.getItem('token');

  const handleDropCourse = async () => {
    try {
      await dropCourse(studentId, courseId, token);
      onCourseDropped();
      alert('Course dropped successfully');
    } catch (error) {
      console.error('Error dropping course:', error);
    }
  };

  return (
    <div>
      <button onClick={handleDropCourse}>Drop Course</button>
    </div>
  );
}

export default DropCourse;
