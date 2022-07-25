import { NavLink } from 'react-router-dom'
import classes from './home.module.css'
const Home = () => {
    return (
        <div className={classes.home}>
            <span className={classes.span1}>
                <div className={classes.name}>
                    <p>"Welcome to Expense Tracker...!!!"</p>
                </div>
                <div className={classes.update}>
                    <div className={classes.button}>
                        your profile is incomplete..<NavLink to={'/home/profile'}>complete now</NavLink>
                    </div>
                </div>
            </span>
            <span className={classes.span2}>
                
            </span>
        </div>
    )
}
export default Home