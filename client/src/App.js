import React from 'react';
import './App.css';
import {Route,Switch,Redirect} from 'react-router-dom'
import UsersPage from './pages/UsersPage';
import CreatePage from './pages/CreatePage'
import UserPage from './pages/UserPage'
import EditPage from './pages/EditPage'
import AuthPage from './pages/AuthPage'
import ProfilePage from './pages/ProfilePage';
import ResetPage from './pages/ResetPage';
import PasswordPage from './pages/PasswordPage';

function App() {
  return (
    <div className="App">
        <Switch>
          <Route path="/auth" exact component={AuthPage}/>
          <Route path="/users" exact component={UsersPage}/>
          <Route path="/users/create" component={CreatePage}/> 
          <Route path="/users/:id" exact component={UserPage}/>
          <Route path="/users/:id/edit" component={EditPage}/>
          <Route path="/profile" component={ProfilePage}/>
          <Route path="/reset" component={ResetPage}/>
          <Route path="/auth/password/:token"  component={PasswordPage}/>
          <Redirect to="/auth"/>  
        </Switch>
    </div>
  );
}

export default App;
