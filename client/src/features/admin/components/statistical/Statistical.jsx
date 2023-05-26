import React from 'react';
import Widget from './components/widget/Widget';
import Feature from './components/feature/Feature';
import Chart from './components/chart/Chart';

const Statistical = () => {
  return (
    <>
      <div className="widgets">
        <Widget type="users" />
        <Widget type="orders" />
        <Widget type="earnings" />
        <Widget type="balance" />
      </div>
      <div className="charts">
        <Feature />
        <Chart />
      </div>
    </>
  );
};

export default Statistical;
