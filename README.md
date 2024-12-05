# Student Course System Web App

A **Student Course System Web App** that allows students to manage their courses and details seamlessly. The application includes features for student registration, login, and course management, built using **Node.js**, **GraphQL**, **React**, and **MongoDB**.

---

## Features
- **Student Functionality:**
  - Add a course.
  - Update course details.
  - Drop a course.
  - View all courses.

- **Admin Functionality:**
  - Manage students.
  - Manage courses.
  - View course-specific enrollments.

---

## Technologies Used
- **Frontend:** React.js (Vite for setup)
- **Backend:** Node.js, Express, GraphQL
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Styling:** CSS (Custom styles)

---

## Prerequisites
Ensure you have the following installed:
- **Node.js**: v16 or later
- **npm**: v7 or later
- **MongoDB**: Locally or via cloud (e.g., MongoDB Atlas)

---

## Setup and Installation

### 1. Clone the Repository
```bash
git clone https://github.com/jatinbudhiraja97/Student-Course-System-web-app.git
cd Student-Course-System-web-app



2. Backend Setup (student_course_system)
Navigate to the backend folder:

bash
Copy code
cd student_course_system
Install dependencies:

bash
Copy code
npm install
Create a .env file in the student_course_system directory and add the following variables:

makefile
Copy code
MONGO_URI=mongodb://<your-mongo-uri>
JWT_SECRET=<your-secret-key>
PORT=4000
Start the backend server:

bash
Copy code
node server.js
The backend server will start on http://localhost:4000.

3. Frontend Setup (StudentCoursePortal)
Navigate to the frontend folder:

bash
Copy code
cd ../StudentCoursePortal
Install dependencies:

bash
Copy code
npm install
Start the React development server:

bash
Copy code
npm run dev
Open your browser and navigate to the URL shown in the terminal (e.g., http://localhost:5173).

4. Access the Application
Frontend: http://localhost:5173
Backend GraphQL API: http://localhost:4000/graphql
Project Structure
Backend (student_course_system)
models/: Mongoose schemas for Student and Course.
graphql/:
schema.js: Main GraphQL schema.
types/: Custom GraphQL types for Student and Course.
resolvers/: Logic for queries and mutations.
middleware/: Authentication middleware.
server.js: Entry point for the backend server.
Frontend (StudentCoursePortal)
src/:
components/: React components for Authentication, Dashboard, and Course management.
assets/: Images and static files.
api/: API helpers for backend communication.
vite.config.js: Vite configuration for React development.
Commands for Development
Backend
Start the backend server:
bash
Copy code
cd student_course_system
node server.js
Frontend
Start the frontend development server:
bash
Copy code
cd StudentCoursePortal
npm run dev
Database
Ensure MongoDB is running locally or configure a connection string for MongoDB Atlas in .env.

