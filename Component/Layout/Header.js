import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import AuthContext from '../Store/Auth-contex'
import classes from './Header.module.css'

const Header = () => {
    const history = useHistory()
    const ctx = useContext(AuthContext)
    const logoutHandler = (event) => {
        event.preventDefault()
        ctx.logOut()
        history.replace('/signin')
    }

    return (
        <div className={classes.header}>
            <span className={classes.span1}>
                <h1>MyWebLink</h1>
            </span>
            <span className={classes.span2}>
                <h4>Home</h4>
                <h4>About</h4>
                <h4>Contact Us</h4>
            </span>
            <span className={classes.actions}>
                <button onClick={logoutHandler}>Log Out</button>
            </span>
        </div>
    )
}

export default Header