import React from 'react';
import {Route,Switch,Redirect} from 'react-router-dom'
import UsersPage from './pages/UsersPage';
import CreatePage from './pages/CreatePage'
import UserPage from './pages/UserPage'
import EditPage from './pages/EditPage'
import AuthPage from './pages/AuthPage'
import './App.css';

function App() {
  return (
    <div className="App">
        <Switch>
          <Route path="/auth" component={AuthPage}/>
          <Route path="/users" exact component={UsersPage}/>
          <Route path="/users/create" component={CreatePage}/> 
          <Route path="/users/:id" exact component={UserPage}/>
          <Route path="/users/:id/edit" component={EditPage}/>
          <Redirect to='/auth'/>  
        </Switch>
    </div>
  );
}

export default App;
