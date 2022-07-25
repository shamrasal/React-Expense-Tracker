import { Redirect, Route, Switch } from 'react-router-dom'
import Header from "./Component/Layout/Header";
import Back from './Component/Assets/BACK.jpg'
import classes from './App.module.css'
import SignUpForm from "./Component/Login/SignUpForm";
import SignInForm from "./Component/Login/SignInForm";
import Home from './Component/Pages/Home';
import ProfileUpdateForm from './Component/Pages/ProfileUpdateForm';

function App() {
  return (
    <div>
      <Header></Header>
      <Switch>
        <Route path={'/'} exact>
          <Redirect to={'/signup'} />
        </Route>
        <Route path={'/home'} exact>
          <Home></Home>
        </Route>
        <Route path={'/signup'}>
          <SignUpForm></SignUpForm>
        </Route>
        <Route path={'/signin'}>
          <SignInForm></SignInForm>
        </Route>
        <Route path={'/home/profile'}>
          <ProfileUpdateForm></ProfileUpdateForm>
        </Route>
      </Switch>
      <img className={classes.img} alt='back' src={Back}></img>
    </div>
  );
}

export default App;
