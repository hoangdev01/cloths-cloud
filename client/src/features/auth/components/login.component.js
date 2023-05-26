import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../../../contexts/AuthContext';

function Login(props) {
  const {
    loginUser,
    authState: { role },
  } = useContext(AuthContext);

  const {} = useContext(AuthContext);

  const navigate = useNavigate();

  const [loginError, setLoginError] = useState('');

  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });

  const { username, password } = loginForm;
  const onchangeLoginForm = event =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  const login = async event => {
    try {
      event.preventDefault();
      const loginData = await loginUser(loginForm);
      if (loginData.success) {
        window.location.reload();
      } else {
        setLoginError(loginData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-inner">
      <h3>Sign In</h3>
      <form onSubmit={login}>
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
            required
            name="username"
            value={username}
            onChange={onchangeLoginForm}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            required
            name="password"
            value={password}
            onChange={onchangeLoginForm}
          />
        </div>
        <div
          style={{
            color: 'red',
            'font-size': '12px',
            'margin-bottom': '10px',
            'padding-left': '5px',
          }}
        >
          <i>{loginError}</i>
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          <a href="forget-password">Forgot password?</a>
        </p>
        <br />
        <hr width="100%" align="center" />
        <p className="forgot-password text-right">
          Not a member? <a href="sign-up">Sign up now</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
