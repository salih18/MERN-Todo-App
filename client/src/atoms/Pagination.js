import React, { useState, useEffect, useCallback } from 'react';
import { Pagination } from 'react-bootstrap';
import './Pagination.css';

const Paginations = ({
  items,
  pageSize,
  initialPage = 1,
  onChangePage,
  paginationClass,
  setActivePage,
  isSearchActive,
  activePage,
  paginationReset,
  setPaginationReset
}) => {
  const [pager, setPager] = useState({});

  const setPage = useCallback(
    (page, size) => {
      // get new pager object for specified page
      const pager = getPager(items.length, page, size);

      if ((page < 1 || page > pager.totalPages) && !isSearchActive) {
        return;
      }
      // get new page of items from items array
      const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
      setActivePage(page);
      // update state
      setPager(pager);

      // call change page function in parent component
      onChangePage(pageOfItems);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items]
  );

  useEffect(() => {
    // set page if items array isn't empty
    if ((items && items.length) || isSearchActive) {
      if (paginationReset) {
        setPage(initialPage, pageSize);
      } else {
        setPage(activePage, pageSize);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPage, isSearchActive, items, pageSize, setPage]);

  const getPager = (totalItems, currentPage = 1, pageSize) => {
    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage, endPage;
    if (totalPages <= 6) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 4) {
        startPage = 1;
        endPage = 7;
      } else if (currentPage + 3 >= totalPages) {
        startPage = totalPages - 6;
        endPage = totalPages;
      } else {
        startPage = currentPage - 3;
        endPage = currentPage + 3;
      }
    }
    // start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages

    const pages = [...Array(endPage + 1 - startPage).keys()].map((i) => {
      if (i === 0) {
        return { page: 1, value: true };
      }
      if (currentPage >= 5 && i === 1) {
        return { page: startPage + i, value: false };
      }
      if (currentPage + 3 >= totalPages && i >= 4) {
        return { page: startPage + i, value: true };
      }
      if (i < 5) {
        return { page: startPage + i, value: true };
      }
      if (i < 6) {
        return { page: startPage + i, value: false };
      }
      if (i === 6) {
        return { page: totalPages, value: true };
      }
    });

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  };
  if (!pager.pages || pager.pages.length <= 1) {
    // don't display pager if there is only 1 page
    return null;
  }
  return (
    <Pagination className={`${paginationClass}`}>
      <Pagination.First onClick={() => setPage(1, pager.pageSize)} />
      <Pagination.Prev
        onClick={() => {
          setPaginationReset(true);
          setPage(pager.currentPage - 1, pager.pageSize);
        }}
      />

      {pager.pages.map((page, i) => (
        <Pagination.Item
          active={page.value && pager.currentPage === page.page}
          key={'page' + i}
          onClick={() => {
            setPaginationReset(true);
            page.value && setPage(page.page, pager.pageSize);
          }}
          className={!page.value ? 'disabled' : ''}
        >
          {page.value ? page.page : '...'}
        </Pagination.Item>
      ))}

      <Pagination.Next
        onClick={() => {
          setPaginationReset(true);
          setPage(pager.currentPage + 1, pager.pageSize);
        }}
      />
      <Pagination.Last onClick={() => setPage(pager.totalPages, pager.pageSize)} />
    </Pagination>
  );
};

export default Paginations;
