import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage/Loadable';
import Search from 'containers/Search/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';

export default function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/issues" component={HomePage} />
        <Route exact path="/search/:input" component={Search} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
