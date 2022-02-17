import { Switch, Route } from 'react-router-dom';

import { Dashboard, Login, Register } from '../pages';

export const Routing = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Dashboard />
      </Route>
      <Route path='/register'>
        <Register />
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
    </Switch>
  )
}
