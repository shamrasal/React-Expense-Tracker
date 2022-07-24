import Header from "./Component/Layout/Header";
import Back from './Component/Assets/BACK.jpg'
import classes from './App.module.css'
import SignUpForm from "./Component/Login/SignUpForm";

function App() {
  return (
    <div>
      <Header></Header>
      <SignUpForm></SignUpForm>

      <img className={classes.img} alt='back' src={Back}></img>
    </div>
  );
}

export default App;
