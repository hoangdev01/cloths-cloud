import './home.scss';
import Sidebar from './components/sidebar/Sidebar';
import Navbar from './components/navbar/Navbar';
import Statistical from './components/statistical/Statistical';
import UserManager from './components/usermanager/UserManager';
import EmployeeManager from './components/employeemanager/EmployeeManager';
import BillManager from './components/billmanager/BillManager';
import TourManager from './components/tourmanager/TourManager';
import HotelManager from './components/hotelmanager/HotelManager';
import CarManager from './components/carmanager/CarManager';
import EventManager from './components/eventmanager/EventManager';
import TagManager from './components/tagmanager/TagManager';
import ProfileManager from './components/profilemanager/ProfileManager';
import { AuthContext } from '../../contexts/AuthContext';
import React, { useContext } from 'react';
// import { Navigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import FBChat from '../../components/social/FbChat';

const Amin = ({ adminRoute }) => {
  const {
    authState: { authLoading, isAuthenticated, role },
  } = useContext(AuthContext);
  var body = <></>;
  var content = <></>;
  if (authLoading) {
    body = (
      <div
        className="d-flex justify-content-center mt-2"
        style={{ width: '100vw', height: '100vh', 'padding-top': '20%' }}
      >
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (!isAuthenticated || role !== 'admin')
    return <></>; // Thêm trang 404
  else {
    if (adminRoute === 'dashboard') content = <Statistical />;
    else if (adminRoute === 'user') content = <UserManager />;
    else if (adminRoute === 'employee') content = <EmployeeManager />;
    else if (adminRoute === 'bill') content = <BillManager />;
    else if (adminRoute === 'tour') content = <TourManager />;
    else if (adminRoute === 'hotel') content = <HotelManager />;
    else if (adminRoute === 'car') content = <CarManager />;
    else if (adminRoute === 'event') content = <EventManager />;
    else if (adminRoute === 'tag') content = <TagManager />;
    else if (adminRoute === 'profile') content = <ProfileManager />;
    else content = <Statistical />;

    body = (
      <div className="home">
        {/* <FBChat /> */}
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          {content}
        </div>
      </div>
    );
  }

  return <>{body}</>;
};

export default Amin;
