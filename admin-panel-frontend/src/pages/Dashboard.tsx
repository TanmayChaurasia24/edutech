import React from "react";
import { FaRegBell } from "react-icons/fa";
import AdminSidebar from "../components/AdminSidebar";
import { BsSearch } from "react-icons/bs";
import userimage from "../assets/images.png";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import BarChart from "../components/charts/Barcharts";
import { ChartOptions } from "chart.js";

const Dashboard = () => {
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
              percent={10}
              value={3500}
              color="rgb(0,115,255)"
            />
            <WidgetItem
              heading="Teacher"
              percent={14}
              value={350}
              color="rgb(0,115,255)"
            />
            <WidgetItem
              heading="Courses"
              percent={10}
              value={30}
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
      <h4>{amount ? `$${value.toLocaleString()}` : value.toLocaleString()}</h4>
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
