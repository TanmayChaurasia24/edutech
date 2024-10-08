import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/students.scss";

interface User {
  username: string;
  name: string;
  phoneNumber: string;
  email: string;
  role: "student" | "teacher";
  collegeName: string;
  city: string;
  state: string;
  country: string;
  enrolledCourses: Array<string>;
  subject?: string;
  teachingExperience?: number;
}

interface SendingData {
  username: string;
}

interface ApiResponse {
  students: User[];
  num_students: number;
}

const Students: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          "http://localhost:8000/api/user/allstudents"
        );
        setUsers(response.data.students);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchUsers();
  }, []);

  if (error) return <div>Error: {error}</div>;

  const handleStudentDelete = async (username: string) => {
    const data: SendingData = { username };
  
    try {

      await axios.request({
        url: "http://localhost:8000/api/user/deleteStudent",
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        data,
      });
      console.log("request send");
      
      setUsers((prevUsers) => prevUsers.filter(user => user.username !== username));
  
    } catch (error) {
      setError((error as Error).message);
    }
  };
  
  
  

  return (
    <>
      <div className="admincontainer flex">
        <AdminSidebar />
        <main className="student-area">
          <h1 className="heading">List Of All Students</h1>
          {users.map((user, index) => (
            <div key={index} className="student-list">
              <div className="single-student">
                <h3 className="text-xl font-semibold">{user.name}</h3>
                <p>
                  <strong>Username:</strong> {user.username}
                </p>
                <p>
                  <strong>Phone Number:</strong> {user.phoneNumber}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Role:</strong> {user.role}
                </p>
                <p>
                  <strong>College Name:</strong> {user.collegeName}
                </p>
                <p>
                  <strong>City:</strong> {user.city}
                </p>
                <p>
                  <strong>State:</strong> {user.state}
                </p>
                <p>
                  <strong>Country:</strong> {user.country}
                </p>
                <p>
                  <strong>Enrolled Courses:</strong>{" "}
                  {user.enrolledCourses.join(", ")}
                </p>
                {user.role === "teacher" && user.subject && (
                  <>
                    <p>
                      <strong>Subject:</strong> {user.subject}
                    </p>
                    <p>
                      <strong>Teaching Experience:</strong>{" "}
                      {user.teachingExperience} years
                    </p>
                  </>
                )}
                <div className="all-btn">
                  <button
                    className="single-btn delete-btn"
                    onClick={() => handleStudentDelete(user.username)}
                  >
                    Delete
                  </button>
                  <button className="single-btn edit-btn">Edit</button>
                  <button className="single-btn block-btn">Block</button>
                </div>
              </div>
            </div>
          ))}
        </main>
      </div>
    </>
  );
};

export default Students;
