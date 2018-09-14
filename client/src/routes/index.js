import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import DashboardPage from '../containers/DashboardPage';
import CollectionsPage from '../containers/CollectionsPage';
import CollectionPage from '../containers/CollectionPage';
import InvitePage from '../containers/InvitePage';
import NotFoundPage from '../containers/NotFoundPage';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={DashboardPage} exact />
        <Route path='/invite' component={InvitePage} />
        <Route path='/collections' component={CollectionsPage} exact />
        <Route path='/collections/:id' component={CollectionPage} />
        <Route path='/:id' component={DashboardPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

