import React from 'react';
import { useSearch, usePagination } from './../../redux/hooks';

import Input from './../../atoms/Input';

const Search = () => {
  const { setSearchTerm, searchTerm, isActive } = useSearch();
  const { setPageReset } = usePagination();
  const handleChange = (e) => {
    setPageReset(true);
    setSearchTerm(e.target.value);
  };

  return (
    <Input
      type="text"
      placeholder="search by tag"
      className="border-top-0 border-left-0 border-right-0"
      pClassName="ml-4"
      onChange={handleChange}
      value={isActive ? searchTerm : ''}
      id={'search-todo-tag-input'}
    />
  );
};

export default Search;
