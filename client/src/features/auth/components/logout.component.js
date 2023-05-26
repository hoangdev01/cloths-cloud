import React, { useState, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import '../style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../../../contexts/AuthContext';

function Logout(props) {
  const { logoutUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const logout = async () => {
    try {
      const logoutData = await logoutUser();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  logout();
}

export default Logout;
