import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/students.scss";

interface Article {
  title: string;
  content: string;
  image?: URL;
  thumbnail?: URL;
}

interface Course {
  name: string;
  description: string;
  articles?: Article[];
  video?: URL;
}

interface ApiResponse {
  fetchall: Course[];
  num_course: number;
}

const Students: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          "http://localhost:8000/api/course/all"
        );
        // console.log(response.data.fetchall);
        
        setCourses(response.data.fetchall);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchCourses();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="admincontainer flex">
        <AdminSidebar />
        <main className="student-area">
          <h1 className="heading">List Of All Courses</h1>
          {courses.length === 0 ? (
            <p>No courses available</p>
          ) : (
            courses.map((course, index) => (
              <div key={index} className="student-list">
                <div className="single-student">
                  <h3 className="text-xl font-semibold">{course.name}</h3>
                  <p>
                    <strong>Description:</strong> {course.description}
                  </p>
                  <div className="all-btn">
                    <button className="single-btn delete-btn">Delete</button>
                    <button className="single-btn edit-btn">Edit</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </main>
      </div>
    </>
  );
};

export default Students;
