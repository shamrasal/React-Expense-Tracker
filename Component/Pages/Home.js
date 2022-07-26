import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import AuthContext from '../Store/Auth-contex'
import classes from './home.module.css'
const Home = () => {
    const ctx = useContext(AuthContext)
    const [done, setDone] = useState(false)

    const verifyHandler = (event) => {
        event.preventDefault()
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDLwFZKg8KZEIlRPJ_FBc37TP7Vk45D3AE',
            {
                method: 'POST',
                body: JSON.stringify({
                    idToken: ctx.token,
                    requestType: 'VERIFY_EMAIL'
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => {
            if (res.ok) {
                res.json().then(data => {
                    console.log(data)
                    setDone(true)
                })
            } else {
                res.json().then(data => {
                    let errorMessage = 'authentication failed...'
                    if (data && data.error && data.error.message) {
                        errorMessage = data.error.message
                    }
                    alert(errorMessage)
                })
            }
        })
    }

    return (
        <div className={classes.home}>
            <div className={classes.email}>
                <button className={classes.verify} onClick={verifyHandler}>Verify Email</button>
                {done && <p>Verification Email sent</p>}
            </div>
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