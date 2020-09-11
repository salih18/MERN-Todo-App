import { useCallback } from 'react';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { loadUser, register, login, logout } from './actions/auth';
import {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  getTodo,
  toggleCompleteTodo
} from './actions/todo';
import { setSearch, setSearchTerm, setLocationChanged } from './actions/search';
import { setPage, setPageItems, setPageSize, setPageReset } from './actions/pagination';

import { getTags } from './actions/tag';

export function useAuth() {
  const dispatch = useDispatch();
  const { token, isAuthenticated, loading, user } = useSelector(
    (state) => ({
      token: state.auth.token,
      isAuthenticated: state.auth.isAuthenticated,
      loading: state.auth.loading,
      user: state.auth.user
    }),
    shallowEqual
  );

  const boundLoadUser = useCallback(
    (...args) => {
      return dispatch(loadUser(...args));
    },
    [dispatch]
  );

  const boundRegisterUser = useCallback(
    (...args) => {
      return dispatch(register(...args));
    },
    [dispatch]
  );

  const boundLoginUser = useCallback(
    (...args) => {
      return dispatch(login(...args));
    },
    [dispatch]
  );
  const boundLogoutUser = useCallback(
    (...args) => {
      return dispatch(logout(...args));
    },
    [dispatch]
  );

  return {
    token,
    isAuthenticated,
    loading,
    user,
    loadUser: boundLoadUser,
    registerUser: boundRegisterUser,
    loginUser: boundLoginUser,
    logoutUser: boundLogoutUser
  };
}

export function useTodo() {
  const dispatch = useDispatch();
  const { todos, todo, loading, error } = useSelector(
    (state) => ({
      todos: state.todo.todos,
      todo: state.todo.todo,
      loading: state.todo.loading,
      error: state.todo.error
    }),
    shallowEqual
  );

  const boundGetTodos = useCallback(
    (...args) => {
      return dispatch(getTodos(...args));
    },
    [dispatch]
  );

  const boundAddTodo = useCallback(
    (...args) => {
      return dispatch(addTodo(...args));
    },
    [dispatch]
  );

  const boundDeleteTodo = useCallback(
    (...args) => {
      return dispatch(deleteTodo(...args));
    },
    [dispatch]
  );

  const boundUpdateTodo = useCallback(
    (...args) => {
      return dispatch(updateTodo(...args));
    },
    [dispatch]
  );

  const boundGetTodo = useCallback(
    (...args) => {
      return dispatch(getTodo(...args));
    },
    [dispatch]
  );

  const boundToggleCompleteTodo = useCallback(
    (...args) => {
      return dispatch(toggleCompleteTodo(...args));
    },
    [dispatch]
  );

  return {
    todos,
    todo,
    loading,
    error,
    getTodos: boundGetTodos,
    getTodo: boundGetTodo,
    addTodo: boundAddTodo,
    deleteTodo: boundDeleteTodo,
    updateTodo: boundUpdateTodo,
    toggleCompleteTodo: boundToggleCompleteTodo
  };
}

export function useTags() {
  const dispatch = useDispatch();
  const { tags, loading, error } = useSelector(
    (state) => ({
      tags: state.tag.tags,
      loading: state.tag.loading,
      error: state.tag.error
    }),
    shallowEqual
  );

  const boundGetTags = useCallback(
    (...args) => {
      return dispatch(getTags(...args));
    },
    [dispatch]
  );

  return {
    tags,
    loading,
    error,
    getTags: boundGetTags
  };
}

//+++++++++++++++++++++++++ SEARCH TODOS +++++++++++++++++++++++++++++++++++++

export function useSearch() {
  const dispatch = useDispatch();
  const { isActive, searchTerm, filtered } = useSelector(
    (state) => ({
      searchTerm: state.search.searchTerm,
      isActive: state.search.isActive,
      filtered: state.search.filtered
    }),
    shallowEqual
  );

  const boundSetSearchTerm = useCallback(
    (term, type) => {
      return dispatch(setSearchTerm(term, type));
    },
    [dispatch]
  );

  const boundSetSearch = useCallback(
    (...args) => {
      return dispatch(setSearch(...args));
    },
    [dispatch]
  );

  const boundSetLocationChanged = useCallback(
    (...args) => {
      return dispatch(setLocationChanged(...args));
    },
    [dispatch]
  );

  return {
    filtered,
    setSearchTerm: boundSetSearchTerm,
    setSearch: boundSetSearch,
    setLocationChanged: boundSetLocationChanged,
    isActive,
    searchTerm
  };
}

//+++++++++++++++++++++++++ PAGINATION +++++++++++++++++++++++++++++++++++++
export function usePagination() {
  const dispatch = useDispatch();
  const { activePage, pageSize, pageOfItems, pageReset } = useSelector(
    (state) => ({
      activePage: state.pagination.activePage,
      pageSize: state.pagination.pageSize,
      pageOfItems: state.pagination.pageOfItems,
      pageReset: state.pagination.pageReset
    }),
    shallowEqual
  );

  const boundSetPageSize = useCallback(
    (...args) => {
      return dispatch(setPageSize(...args));
    },
    [dispatch]
  );
  const boundSetPage = useCallback(
    (...args) => {
      return dispatch(setPage(...args));
    },
    [dispatch]
  );
  const boundSetPageItems = useCallback(
    (...args) => {
      return dispatch(setPageItems(...args));
    },
    [dispatch]
  );
  const boundSetPageReset = useCallback(
    (...args) => {
      return dispatch(setPageReset(...args));
    },
    [dispatch]
  );
  return {
    activePage,
    pageSize,
    pageOfItems,
    pageReset,
    setPageSize: boundSetPageSize,
    setPage: boundSetPage,
    setPageItems: boundSetPageItems,
    setPageReset: boundSetPageReset
  };
}
