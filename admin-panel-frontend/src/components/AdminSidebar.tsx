import { IconType } from "react-icons";
import { Link, useLocation, Location } from "react-router-dom";
import { RiDashboardFill, RiCoupon3Fill } from "react-icons/ri";
import {
  FaChartBar,
  FaChartPie,
  FaChartLine,
  FaStopwatch,
  FaGamepad,
} from "react-icons/fa";

const AdminSidebar = () => {
  const location = useLocation();
  return (
    <aside>
      <h2>Logo.</h2>
      <div>
        <h5>Dashboard</h5>
        <ul>
          <Li
            url="/admin/dashboard"
            text="Dashboard"
            Icon={RiDashboardFill}
            location={location}
          />
          <Li
            url="/admin/students"
            text="students"
            Icon={RiDashboardFill}
            location={location}
          />
          <Li
            url="/admin/teachers"
            text="teachers"
            Icon={RiDashboardFill}
            location={location}
          />
          <Li
            url="/admin/courses"
            text="courses"
            Icon={RiDashboardFill}
            location={location}
          />
          <Li
            url="/admin/transactions"
            text="transactions"
            Icon={RiDashboardFill}
            location={location}
          />
        </ul>
      </div>
      <div>
        <h5>Apps</h5>
        <ul>
          <Li
            url="/admin/app/stopwatch"
            text="Stopwatch"
            Icon={FaStopwatch}
            location={location}
          />
          <Li
            url="/admin/app/coupon"
            text="Coupon"
            Icon={RiCoupon3Fill}
            location={location}
          />
          <Li
            url="/admin/app/toss"
            text="Toss"
            Icon={FaGamepad}
            location={location}
          />
        </ul>
      </div>
    </aside>
  );
};

interface LiProps {
  url: string;
  text: string;
  location: Location;
  Icon: IconType;
}

const Li = ({ url, text, Icon, location }: LiProps) => {
  const isActive = location.pathname === url;

  return (
    <li>
      <Link to={url} style={{ fontWeight: isActive ? "bold" : "normal" }}>
        <Icon /> {text}
      </Link>
    </li>
  );
};

export default AdminSidebar;
