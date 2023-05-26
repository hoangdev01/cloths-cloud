import React from 'react';
import { Box } from '@chakra-ui/react';

import Header from './components/header/header.jsx';
import Footer from '../src/components/footer/footer.jsx';
import ButtonSrollTop from '../src/components/button-scroll-top.jsx';

import HomePage from './features/home/homepage.jsx';
import { Route, Routes } from 'react-router-dom';
import ServiceList from './features/servicelist/index.jsx';
import ServiceDetail from './features/servicedetail/servicedetail.jsx';
import AuthContextProvider from './contexts/AuthContext.js';
import Carts from './features/cart/carts.jsx';
import Profile from './features/profile/profile.jsx';
import Auth from './features/auth/auth';
import Admin from './features/admin/Admin';
import VerifyToken from './features/auth/verifytoken.js';
// import Auth from './features/auth/auth';

function App() {
  return (
    <AuthContextProvider>
      <Box>
        <ButtonSrollTop />
        <Routes>
          <Route
            path="/admin/dashboard"
            exact
            element={<Admin adminRoute="dashboard" />}
          />
        </Routes>
        <Routes>
          <Route
            path="/admin/user"
            exact
            element={<Admin adminRoute="user" />}
          />
        </Routes>
        <Routes>
          <Route
            path="/admin/employee"
            exact
            element={<Admin adminRoute="employee" />}
          />
        </Routes>
        <Routes>
          <Route
            path="/admin/bill"
            exact
            element={<Admin adminRoute="bill" />}
          />
        </Routes>
        <Routes>
          <Route
            path="/admin/tour"
            exact
            element={<Admin adminRoute="tour" />}
          />
        </Routes>
        <Routes>
          <Route
            path="/admin/hotel"
            exact
            element={<Admin adminRoute="hotel" />}
          />
        </Routes>
        <Routes>
          <Route path="/admin" exact element={<Admin adminRoute="" />} />
        </Routes>
        <Routes>
          <Route path="/admin/car" exact element={<Admin adminRoute="car" />} />
        </Routes>
        <Routes>
          <Route
            path="/admin/event"
            exact
            element={<Admin adminRoute="event" />}
          />
        </Routes>
        <Routes>
          <Route path="/admin/tag" exact element={<Admin adminRoute="tag" />} />
        </Routes>
        <Routes>
          <Route
            path="/admin/profile"
            exact
            element={<Admin adminRoute="profile" />}
          />
        </Routes>
        <Header />
        <Routes>
          <Route path="/sign-in" exact element={<Auth authRoute="login" />} />
        </Routes>
        <Routes>
          <Route
            path="/sign-up"
            exact
            element={<Auth authRoute="register" />}
          />
        </Routes>
        <Routes>
          <Route
            path="/forget-password"
            exact
            element={<Auth authRoute="forget-password" />}
          />
        </Routes>
        <Routes>
          <Route
            path="/reset-password/:token"
            exact
            element={<Auth authRoute="reset-password" />}
          />
        </Routes>
        <Routes>
          <Route path="/logout" exact element={<Auth authRoute="logout" />} />
        </Routes>
        <Routes>
          <Route path="/verify-token/:token" exact element={<VerifyToken />} />
        </Routes>
        <Routes>
          <Route path="/" exact element={<ServiceList />} />
        </Routes>
        <Routes>
          <Route path="/home" exact element={<ServiceList />} />
        </Routes>
        <Routes>
          <Route path="/cloth-list" exact element={<ServiceList />} />
        </Routes>
        <Routes>
          <Route path="/cloth-detail/:slug" exact element={<ServiceDetail />} />
        </Routes>
        <Routes>
          <Route path="/profile" exact element={<Profile />} />
        </Routes>
        <Routes>
          <Route path="/cart" exact element={<Carts />} />
        </Routes>
        
        <Footer />
      </Box>
    </AuthContextProvider>
  );
}

export default App;
