import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../../contexts/AuthContext';

function ResetPassword(props) {
  const token = useParams().token;
  const navigate = useNavigate();
  const { resetPassword } = useContext(AuthContext);
  const [invalidPassword, setInvalidPassword] = useState('');

  const [resetPasswordForm, setResetPasswordForm] = useState({
    password: '',
    rePassword: '',
    token: token,
  });
  const { password, rePassword } = resetPasswordForm;
  const onchangeResetPasswordForm = event => {
    setResetPasswordForm({
      ...resetPasswordForm,
      [event.target.name]: event.target.value,
    });
  };
  const reset = async event => {
    try {
      event.preventDefault();
      if (password != rePassword) {
        setInvalidPassword('Password does not match');
      } else {
        setInvalidPassword('');
        const resetData = await resetPassword(resetPasswordForm);
        if (resetData.success) {
          navigate('/sign-in');
        } else {
          setInvalidPassword(resetData.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="auth-inner">
        <h3>Sign In</h3>
        <form onSubmit={reset}>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              required
              name="password"
              value={password}
              onChange={onchangeResetPasswordForm}
            />
          </div>
          <div className="mb-3">
            <label>Re-enter Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Re-enter password"
              required
              name="rePassword"
              value={rePassword}
              onChange={onchangeResetPasswordForm}
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
            <i>{invalidPassword}</i>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ResetPassword;
