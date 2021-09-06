import React, { useState, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar'
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Home from './components/Home';
import MapContainer from './components/Maps';
import CreateBusiness from './components/CreateBusiness';
import Food from './components/Food';
import BusinessPage from './components/BusinessPage';
import EditBusiness from './components/EditBusiness'
import Retail from './components/Retail';
import Event from './components/Event';
import FoodWrapper from './components/Food/FoodWrapper';
import EventWrapper from './components/Event/EventWrapper';
import RetailWrapper from './components/Retail/RetailWrapper';
import SearchResultWrapper from './components/SearchResult/SearchResultWrapper';
import Footer from './components/Footer';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Switch>
        <Route path='/login' exact={true}>
          <NavBar />
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <NavBar />
          <SignUpForm />
        </Route>
        <Route path='/businesses/food' exact={true}>
          <NavBar />
          {/* <Food /> */}
          <FoodWrapper />
          <Footer />
          {/* <MapContainer containerStyle={{ width: '100vw', height: '450px', }} /> */}
        </Route>
        <Route path='/businesses/retail' exact={true}>
          <NavBar />
          <RetailWrapper />
          <Footer />
          {/* <Retail /> */}
          {/* <MapContainer containerStyle={{ width: '100vw', height: '450px', }} /> */}
        </Route>
        <Route path='/businesses/events' exact={true}>
          <NavBar />
          {/* <Event /> */}
          <EventWrapper />
          <Footer />
          {/* <MapContainer containerStyle={{ width: '100vw', height: '450px', }} /> */}
        </Route>
        {/* <ProtectedRoute path='/users' exact={true} >
          <NavBar />
          <UsersList />
        </ProtectedRoute> */}
        {/* <ProtectedRoute path='/users/:userId' exact={true} >
          <NavBar />
          <User />
        </ProtectedRoute> */}
        <Route path='/' exact={true}>
          <Home />
        </Route>
        <ProtectedRoute path='/businesses/create' exact={true} >
          <NavBar />
          <CreateBusiness />
        </ProtectedRoute>
        <Route path='/businesses/:id' exact={true}>
          <NavBar />
          <BusinessPage />
          <Footer />
        </Route>
        <ProtectedRoute path='/businesses/:id/edit' exact={true}>
          <NavBar />
          <EditBusiness />
        </ProtectedRoute>
        <Route path='/businesses/search/:lat/:long/:catId'>
          <NavBar />
          <SearchResultWrapper />
          <Footer />
        </Route>
        <Route>
          <Redirect to='/' />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
