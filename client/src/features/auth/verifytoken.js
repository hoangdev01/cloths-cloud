import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../../contexts/AuthContext';

function VerifyToken(props) {
  const token = useParams().token;
  const { verifyToken } = useContext(AuthContext);
  const [tokenForm, setTokenForm] = useState({
    verifyToken: useParams().token,
  });
  useEffect(() => {
    setTokenForm(token);
  }, []);

  const navigate = useNavigate();
  const verify = async () => {
    try {
      const verify = await verifyToken(tokenForm);
      if (verify.success) {
        alert('Create account success');
        window.location.reload();
      } else {
        navigate('/sign-up');
      }
    } catch (error) {
      console.log(error);
    }
  };
  verify();
}

export default VerifyToken;
