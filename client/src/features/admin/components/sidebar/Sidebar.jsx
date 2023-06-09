import './sidebar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from '@chakra-ui/react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">Admin Panel</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">SERVICES</p>
          <Link href="/admin/cloth">
            <li>
              <HealthAndSafetyIcon className="icon" />
              <span>Cloth</span>
            </li>
          </Link>
          <p className="title">Dashboard</p>
          <Link href="/admin/dashboard">
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS MENU</p>
          <Link href="/admin/user">
            <li>
              <GroupIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link href="/admin/employee">
            <li>
              <Inventory2Icon className="icon" />
              <span>Employees</span>
            </li>
          </Link>
          <Link href="/admin/bill">
            <li>
              <ProductionQuantityLimitsIcon className="icon" />
              <span>Bills</span>
            </li>
          </Link>
          <p className="title">Event</p>
          <Link href="/admin/event">
            <li>
              <QueryStatsIcon className="icon" />
              <span>Event</span>
            </li>
          </Link>
          <p className="title">Tag</p>
          <Link href="/admin/tag">
            <li>
              <QueryStatsIcon className="icon" />
              <span>Tag</span>
            </li>
          </Link>
          <p className="title">ACCOUNT</p>
          {/* <Link href="/admin/profile">
            <li>
              <PersonIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link> */}
          <Link href="/logout">
            <li>
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
