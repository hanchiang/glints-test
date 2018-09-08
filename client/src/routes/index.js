import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import DashboardPage from '../containers/DashboardPage';
import NotFoundPage from '../containers/NotFound';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={DashboardPage} exact />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

