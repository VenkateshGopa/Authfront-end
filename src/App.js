import './App.css';
import Login from './components/Auth/Login/login';
import Register from './components/Auth/Register/Register';
import Forgotassword from './components/Auth/forgot password/forgetpassword';
import { Switch ,Route, Redirect } from 'react-router-dom';
import Home from './components/data/home';
import Privateroute from './components/Privateroute';
import Publicroute from './components/Publicroute';
function App() {
  return (
   <Switch>
      <Route path='/' exact>
        {localStorage.getItem('loggedin') ? <Redirect to='/home'/> : <Redirect to='/login'/>}
      </Route>
      <Route path='/login'>
        <Publicroute> <Login/> </Publicroute>
      </Route>
      <Route path='/Register'>
      <Publicroute><Register/></Publicroute>
      </Route>
      <Route  path='/forgotpassword'>
        <Forgotassword/>
      </Route>
      <Route path='/home'>
        <Privateroute><Home/></Privateroute>
      </Route>
      <Route path='*'>
        {localStorage.getItem('loggedin') ? <Redirect to='/home'/> : <Redirect to='/login'/>}
      </Route>
   </Switch>
  );
}

export default App;
