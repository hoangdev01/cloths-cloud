import React, { useEffect } from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/');
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={handleButtonClick}>
          Back Home
        </Button>
      }
    />
  );
};

export default NotFoundPage;
