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
import Purchase from './features/purchase/purchase.jsx';
import NotFoundPage from './features/notfound/NotFoundPage.jsx';
import ForbiddenPage from './features/notfound/ForbiddenPage.jsx';
import ServerErrorPage from './features/notfound/ServerErrorPage.jsx';
// import Auth from './features/auth/auth';

function App() {
  return (
    <AuthContextProvider>
      <Box>
        <ButtonSrollTop />
        <Header />
        <Routes>
          <Route
            path="/admin/dashboard"
            exact
            element={<Admin adminRoute="dashboard" />}
          />
          <Route
            path="/admin/user"
            exact
            element={<Admin adminRoute="user" />}
          />
          <Route
            path="/admin/employee"
            exact
            element={<Admin adminRoute="employee" />}
          />
          <Route
            path="/admin/bill"
            exact
            element={<Admin adminRoute="bill" />}
          />
          <Route
            path="/admin/cloth"
            exact
            element={<Admin adminRoute="cloth" />}
          />
          <Route path="/admin" exact element={<Admin adminRoute="" />} />
          <Route
            path="/admin/event"
            exact
            element={<Admin adminRoute="event" />}
          />
          <Route path="/admin/tag" exact element={<Admin adminRoute="tag" />} />
          <Route
            path="/admin/profile"
            exact
            element={<Admin adminRoute="profile" />}
          />
          <Route path="/sign-in" exact element={<Auth authRoute="login" />} />
          <Route
            path="/sign-up"
            exact
            element={<Auth authRoute="register" />}
          />
          <Route
            path="/forget-password"
            exact
            element={<Auth authRoute="forget-password" />}
          />
          <Route
            path="/reset-password/:token"
            exact
            element={<Auth authRoute="reset-password" />}
          />
          <Route path="/logout" exact element={<Auth authRoute="logout" />} />
          <Route path="/verify-token/:token" exact element={<VerifyToken />} />
          <Route path="/" exact element={<ServiceList />} />
          <Route path="/home" exact element={<ServiceList />} />
          <Route path="/cloth-list" exact element={<ServiceList />} />
          <Route path="/cloth-detail/:slug" exact element={<ServiceDetail />} />
          <Route path="/profile" exact element={<Profile />} />
          <Route path="/purchase" exact element={<Purchase />} />
          <Route path="/cart" exact element={<Carts />} />
          <Route path="/403" element={<ForbiddenPage />} />
          <Route path="/500" element={<ServerErrorPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </Box>
    </AuthContextProvider>
  );
}

export default App;
