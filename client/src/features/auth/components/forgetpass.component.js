import '../style.css';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../../../contexts/AuthContext';

function ForgetPassword(props) {
  const { forgetPassword } = useContext(AuthContext);
  const [invalidMessage, setInvalidMessage] = useState('');

  const [forgetPasswordForm, setForgetPasswordForm] = useState({
    email: '',
  });
  const { email } = setForgetPasswordForm;
  const onchangeForgetPasswordForm = event => {
    setForgetPasswordForm({
      ...forgetPasswordForm,
      [event.target.name]: event.target.value,
    });
  };
  const forget = async event => {
    try {
      event.preventDefault();
      const forgetData = await forgetPassword(forgetPasswordForm);
      if (forgetData.success) {
        alert('Check in your email');
      } else {
        setInvalidMessage(forgetData.message);
      }
    } catch (error) {}
  };
  return (
    <div class="auth-inner">
      <h3>
        <i class="fa fa-lock fa-4x"></i>
      </h3>
      <h3 class="text-center">Forgot Password?</h3>
      <h4>You can reset your password here.</h4>
      <div class="panel-body">
        <form class="form" onSubmit={forget}>
          <fieldset>
            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon">
                  <i class="glyphicon glyphicon-envelope color-blue"></i>
                </span>

                <input
                  id="emailInput"
                  placeholder="email address"
                  type="email"
                  className="form-control"
                  required
                  name="email"
                  value={email}
                  onChange={onchangeForgetPasswordForm}
                />
              </div>
            </div>

            <div
              style={{
                color: 'red',
                'font-size': '12px',
                'margin-bottom': '10px',
                'padding-left': '5px',
              }}
            >
              <i>{invalidMessage}</i>
            </div>
            <div class="form-group">
              <input
                class="btn btn-lg btn-primary btn-block"
                value="Send My Password"
                type="submit"
                id="btn-submit"
              />
            </div>

            <p className="forgot-password text-right">
              <a href="sign-in">Return to sign-in?</a>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
export default ForgetPassword;
