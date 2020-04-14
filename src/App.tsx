import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import ResetPassword from './components/ResetpasswordPage'

function App() {
  return (
    <BrowserRouter>
     <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/passwordreset/:id" exact component={ResetPassword} />
     </Switch>
    </BrowserRouter>
  );
}

export default App;
