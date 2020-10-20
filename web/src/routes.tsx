import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React from 'react';
import Landing from './pages/Landing';
import OrphanageMap from './pages/OrphanageMap';
import CreateOrphanage from './pages/CreateOrphanage';
import Orphanage from './pages/Orphanage';


function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={OrphanageMap} />

        <Route path="/orphanages/create" component={CreateOrphanage} />
        <Route path="/orphanages/:id" component={Orphanage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;