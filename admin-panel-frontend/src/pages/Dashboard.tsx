import { FaRegBell } from "react-icons/fa";
import AdminSidebar from "../components/AdminSidebar";
import { BsSearch } from "react-icons/bs";
import userimage from "../assets/images.png";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";

const Dashboard = () => {
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
              <h2>Revenue, Students and Teachers</h2>
              
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
  amount=false,
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
