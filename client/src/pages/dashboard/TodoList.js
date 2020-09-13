import React, { useState, useEffect } from 'react';

import { useTodo, useSearch, usePagination } from './../../redux/hooks';

import Todo from './Todo';

import FlexTable from './../../atoms/FlexTable';
import Modal from './../../atoms/Modal';
import Button from './../../atoms/Button';
import Pagination from './../../atoms/Pagination';
import './TodoList.css';

const title = [
  {
    title: 'Tag',
    fieldName: 'tags',
    className: 'col-xs-2'
  },
  {
    title: 'Todo',
    fieldName: 'text',
    className: 'col-xs-2'
  },
  {
    title: 'Created At',
    fieldName: 'date',
    className: 'col-xs-3'
  },

  {
    title: '',
    fieldName: 'icon',

    icons: ['Edit', 'Check', 'TrashAlt'],
    className: 'col-xs-3'
  }
];

const TodoList = () => {
  const { todos, getTodos, deleteTodo, getTodo, toggleCompleteTodo } = useTodo();

  const { filtered, isActive, searchTerm, setSearch } = useSearch();
  const {
    activePage,
    pageSize,
    pageOfItems,
    setPageItems,
    setPage,
    pageReset,
    setPageReset
  } = usePagination();

  //Modal States
  const [modal, setModal] = useState({
    isOpen: false,
    type: '',
    id: ''
  });

  // Fetch All Todos
  useEffect(() => {
    getTodos();
  }, [getTodos]);

  // Clientside Todo Search
  useEffect(() => {
    searchTerm && setSearch(searchTerm, todos);
  }, [searchTerm, setSearch, todos]);

  //Modal Handlers

  const handleShow = (type, id) => async (e) => {
    e.preventDefault();
    if (type === 'add') {
      setModal({
        isOpen: true,
        type: 'Add'
      });
    }

    if (type === 'update') {
      await getTodo(id);
      setModal({
        isOpen: true,
        type: 'Update',
        id: id
      });
    }
  };

  // Icon Handlers
  const handleClick = (e, icon, id) => {
    switch (icon) {
      case 'Check':
        setPageReset(false);
        toggleCompleteTodo(id);
        break;
      case 'Edit':
        setPageReset(false);
        handleShow('update', id)(e);
        break;
      case 'TrashAlt':
        setPageReset(true);
        deleteTodo(id);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <Modal
        isOpen={modal.isOpen}
        modalClose={() => setModal({ isOpen: false })}
        centered={true}
      >
        {modal.type === 'Add' && <Todo description="Add" setModal={setModal} />}
        {modal.type === 'Update' && <Todo description="Update" setModal={setModal} />}
      </Modal>
      <Button
        text="Add Todo"
        onClick={handleShow('add')}
        color="white"
        type="submit"
        className="float-right mb-2 todo-button add-todo-button"
        id="user-register-button"
      />

      {todos.length === 0 ? (
        <h2 className="m-5 lead">
          {' '}
          You don't have any todo. Click the button to add a todo!{' '}
        </h2>
      ) : (
        <FlexTable
          data={pageOfItems}
          titleData={title}
          iconClick={(e, icon, id) => handleClick(e, icon, id)}
          tableId={'todo-list-flex-table'}
        />
      )}

      <Pagination
        id={'todo-list-table-pagination'}
        items={isActive ? filtered : todos}
        onChangePage={setPageItems}
        setActivePage={setPage}
        pageSize={pageSize}
        activePage={activePage}
        isSearchActive={isActive}
        paginationClass="todo-list-table-pagination d-flex justify-content-center align-items-center"
        paginationReset={pageReset}
        setPaginationReset={setPageReset}
      />
    </>
  );
};

export default TodoList;
