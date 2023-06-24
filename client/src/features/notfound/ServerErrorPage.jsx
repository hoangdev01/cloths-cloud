import React, { useEffect } from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const ServerErrorPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/');
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Button type="primary" onClick={handleButtonClick}>
          Back Home
        </Button>
      }
    />
  );
};

export default ServerErrorPage;
