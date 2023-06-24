import React, { useEffect } from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const ForbiddenPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={handleButtonClick}>
          Back Home
        </Button>
      }
    />
  );
};

export default ForbiddenPage;
