import React, { useEffect, useState } from "react";
import { FaRegBell } from "react-icons/fa";
import AdminSidebar from "../components/AdminSidebar";
import { BsSearch } from "react-icons/bs";
import userimage from "../assets/images.png";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import BarChart from "../components/charts/Barcharts";
import { ChartOptions } from "chart.js";
import axios from "axios";

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

interface apiResponseCourse {
  fetchall: Course[];
  numberOfCourses: number;
}

interface apiresponseStudent {
  students: User[];
  num_students: number;
}

interface apiresponseTeacher {
  teacher: User[];
  num_teacher: number;
}

const Dashboard = () => {
  const [num_s, sets] = useState(0);
  const [num_t, sett] = useState(0);
  const [num_c, setc] = useState(0);

  const [studentchange, setstudentchange] = useState(0);
  const [teacherchange, setteacherchange] = useState(0);
  const [coursechange, setcoursechange] = useState(0);

  const prev_s:number = num_s;
  const prev_c:number = num_c;
  const prev_t:number = num_t;

  useEffect(() => {
    const fetchDetails = async () => {
      const num_students = await axios.get<apiresponseStudent>(
        "http://localhost:8000/api/user/allstudents"
      );
      const num_teachers = await axios.get<apiresponseTeacher>(
        "http://localhost:8000/api/user/allteachers"
      );
      const num_courses = await axios.get<apiResponseCourse>(
        "http://localhost:8000/api/course/all"
      );

      sets(num_students.data.num_students);
      sett(num_teachers.data.num_teacher);
      setc(num_courses.data.numberOfCourses);

      const per_change = (curr: number, prev: number):number => {
        if(prev === 0) return 100
        return ((curr - prev) / prev) * 100;
      };

      setstudentchange(per_change(num_students.data.num_students, prev_s));
      setteacherchange(per_change(num_teachers.data.num_teacher, prev_t));
      setcoursechange(per_change(num_courses.data.numberOfCourses, prev_c));
    };

    fetchDetails();
  }, []);

  const chartData = {
    labels: ["2019", "2020", "2021", "2022", "2023"],
    datasets: [
      {
        label: "Revenue",
        data: [5000, 6000, 7000, 8000, 9000], // Revenue data for the last 5 years
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Background color for bars
        borderColor: "rgba(75, 192, 192, 1)", // Border color for bars
        borderWidth: 1, // Border width for bars
      },
      {
        label: "Number of Students",
        data: [2003, 2250, 3020, 3504, 1400], // Number of students data for the last 5 years
        backgroundColor: "rgba(153, 102, 255, 0.2)", // Background color for bars
        borderColor: "rgba(153, 102, 255, 1)", // Border color for bars
        borderWidth: 1, // Border width for bars
      },
      {
        label: "Number of Teachers",
        data: [5650, 6530, 7022, 8220, 940], // Number of teachers data for the last 5 years
        backgroundColor: "rgba(255, 159, 64, 0.2)", // Background color for bars
        borderColor: "rgba(255, 159, 64, 1)", // Border color for bars
        borderWidth: 1, // Border width for bars
      },
    ],
  };

  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
        mode: "nearest",
        intersect: false,
      },
      title: {
        display: false,
        text: "Overview of Revenue, Students, and Teachers",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <div className="admincontainer">
        <AdminSidebar />
        <main className="dashboard">
          <div className="bar">
            <BsSearch />
            <input type="text" placeholder="Search for data, users, docs" />
            <FaRegBell />
            <img src={userimage} alt="user" />
          </div>

          <section className="widgetcontainer">
            <WidgetItem
              heading="Revenue"
              percent={-4}
              amount={true}
              value={3500}
              color="rgb(0,115,255)"
            />
            <WidgetItem
              heading="Students"
              percent={studentchange}
              value={num_s}
              color="rgb(0,115,255)"
            />
            <WidgetItem
              heading="Teacher"
              percent={teacherchange}
              value={num_t}
              color="rgb(0,115,255)"
            />
            <WidgetItem
              heading="Courses"
              percent={coursechange}
              value={num_c}
              color="rgb(0,115,255)"
            />
            <WidgetItem
              heading="transactions"
              percent={10}
              value={301}
              color="rgb(0,115,255)"
            />
          </section>

          <section className="graphcontainer">
            <div className="revenuechart">
              <h2>Revenue, Students, and Teachers</h2>
              <BarChart data={chartData} options={chartOptions} />
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

interface WidgetItemProps {
  heading: string;
  value: number;
  percent: number;
  color: string;
  amount?: boolean;
}

const WidgetItem = ({
  heading,
  value,
  percent,
  color,
  amount = false,
}: WidgetItemProps) => (
  <article className="widget" style={{ borderColor: color }}>
    <div className="widgetinfo">
      <p>{heading}</p>
      <h4>{amount ? `$${value}` : value}</h4>
      {percent > 0 ? (
        <span className="green">
          <HiTrendingUp /> +{percent}%
        </span>
      ) : (
        <span className="red">
          <HiTrendingDown /> {percent}%
        </span>
      )}
    </div>
  </article>
);

export default Dashboard;
