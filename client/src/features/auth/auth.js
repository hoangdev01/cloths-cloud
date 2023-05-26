import React, { useContext, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import ForgetPassword from './components/forgetpass.component';
import SignUp from './components/signup.component';
import Login from './components/login.component.js';
import Logout from './components/logout.component.js';
import { AuthContext } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import ResetPassword from './resetpassword';

function Auth({ authRoute }) {
  const {
    authState: { authLoading, isAuthenticated, role },
  } = useContext(AuthContext);
  let body;
  if (authLoading) {
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (isAuthenticated) {
    if (authRoute === 'logout')
      body = (
        <>
          <Logout />
        </>
      );
    else {
      if (role === 'admin' || role === 'employee')
        return <Navigate to="/admin" />;
      return <Navigate to="/home" />;
    }
  } else
    body = (
      <>
        {authRoute === 'login' && <Login />}
        {authRoute === 'register' && <SignUp />}
        {authRoute === 'forget-password' && <ForgetPassword />}
        {authRoute === 'reset-password' && <ResetPassword />}
      </>
    );

  return <Box>{body}</Box>;
}

export default Auth;
