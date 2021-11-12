import './App.css';

import Login from './components/Auth/Login/login';
import Register from './components/Auth/Register/Register';
import Forgotassword from './components/Auth/forgot password/forgetpassword';
import { Switch ,Route, Redirect } from 'react-router';
import Home from './components/data/home';
function App() {
  return (
   <Switch>
      <Route path='/' exact>
        {localStorage.getItem('loggedin') ? <Redirect to='/home'/> : <Redirect to='/login'/>}
      </Route>
      <Route path='/login'>
        <Login/>
      </Route>
      <Route path='/Register'>
        <Register/>
      </Route>
      <Route  path='/forgotpassword'>
        <Forgotassword/>
      </Route>
      <Route path='/home'>
        {localStorage.getItem('loggedin') ?  <Home/> : <Redirect to='/login'/>}
      </Route>
      <Route path='*' exact>
        {localStorage.getItem('loggedin') ? <Redirect to='/home'/> : <Redirect to='/login'/>}
      </Route>
   </Switch>
  );
}

export default App;
