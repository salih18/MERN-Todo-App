import React from 'react';
import { usePagination } from './../../redux/hooks';

import Input from './../../atoms/Input';

const PageSize = () => {
  // Search State
  const { setPageSize, pageSize } = usePagination();

  const handleChange = (e) => {
    setPageSize(Number(e.target.value));
  };

  return (
    <Input
      id="pageSize"
      type="text"
      placeholder="search"
      className="border-top-0 border-left-0 border-right-0"
      onChange={handleChange}
      value={pageSize}
      as="select"
    >
      <option>10</option>
      <option>20</option>
      <option>30</option>
      <option>40</option>
      <option>50</option>
    </Input>
  );
};

export default PageSize;
