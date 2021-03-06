import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import ResetPassword from './components/ResetpasswordPage'

function App() {
  return (
    <BrowserRouter>
     <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/passwordreset/:email" exact component={ResetPassword} />
        <Route path='/' render={() => (<div>Route Not Found</div>)} />
     </Switch>
    </BrowserRouter>
  );
}

export default App;
