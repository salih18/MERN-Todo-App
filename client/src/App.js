import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Components
import Homepage from './pages/Homepage';
import Navbar from './pages/layout/Navbar';
import LatestNews from './pages/layout/LatestNews';

import Routes from './pages/routing/Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUser } from './redux/actions/auth';

import setAuthToken from './helpers/setAuthToken';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar/>
          <LatestNews/>
          <ToastContainer newestOnTop autoClose={2000} />

          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route component={Routes} />
          </Switch>
        </>
      </Router>
    </Provider>
  );
}

export default App;
