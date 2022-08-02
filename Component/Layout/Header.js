import { NavLink, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from '../Store/Auth'

import classes from './Header.module.css'

const Header = () => {
    const dispatch = useDispatch()
    const authisLogin = useSelector(state => state.auth.isLoggedIn)
    console.log(authisLogin)
    const history = useHistory()
    const logoutHandler = (event) => {
        event.preventDefault()
        dispatch(authActions.logout())
        history.replace('/signin')
    }
    return (
        <div className={classes.header}>
            <span className={classes.span1}>
                <h1>MyWebLink</h1>
            </span>
            <span className={classes.span2}>
                <h4>Home</h4>
                {authisLogin && <h4><NavLink to={'/expenses'}>Expenses</NavLink></h4>}
                <h4>About</h4>
                <h4>Contact Us</h4>
            </span>
            <span className={classes.actions}>
                {authisLogin && <button onClick={logoutHandler}>Log Out</button>}
            </span>
        </div>
    )
}

export default Header