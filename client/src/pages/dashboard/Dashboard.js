import React from 'react';
import TodoList from './TodoList';
import Search from './Search';

import PageSize from './PageSize';

const Dashboard = () => {
  return (
    <>
      <div className="d-flex ">
        <PageSize />
        <Search />
      </div>
      <TodoList />
    </>
  );
};

export default Dashboard;
