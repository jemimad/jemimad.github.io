import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React from 'react';
import CreateAndEdit from '../pages/CreateAndEdit';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';


export default function Routers() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/create" exact component={CreateAndEdit} />
      <Route path="/edit/:id" exact component={CreateAndEdit} />
      <Route>
        <NotFound/>
      </Route>
    </Switch>
    </BrowserRouter>
  );
}