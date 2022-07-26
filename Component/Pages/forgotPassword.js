import React, { useRef, useState } from 'react'
import classes from './ForgotPassword.module.css'
import forgot from '../Assets/forgot.webp'
import { NavLink } from 'react-router-dom'
import LoadingSpinner from '../UI/LoadingSpinner'
const Forgotpassword = () => {
    const valemailref = useRef()
    const [isLoading, setIsLoading] = useState(false);
    const onSubmitHandler = (event) => {
        event.preventDefault()
        const enteredEmail = valemailref.current.value
        setIsLoading(true)
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDLwFZKg8KZEIlRPJ_FBc37TP7Vk45D3AE',
            {
                method: 'POST',
                body: JSON.stringify({
                    requestType: 'PASSWORD_RESET',
                    email: enteredEmail
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        ).then(res => {
            if (res.ok) {
                res.json().then(data => {
                    console.log(data)
                    setIsLoading(false)
                    valemailref.current.value = ''
                })
            } else {
                res.json().then(data => {
                    let errorMessage = 'authentication failed...'
                    if (data && data.error && data.error.message) {
                        errorMessage = data.error.message
                    }
                    alert(errorMessage)
                    valemailref.current.value = ''
                    setIsLoading(false)
                })
            }
        })
    }
    return (
        <section className={classes.auth}>
            {isLoading && <LoadingSpinner></LoadingSpinner>}
            <span className={classes.span1}>
                <img alt='forgot' className={classes.img} src={forgot}></img>
            </span>
            <span className={classes.span2}>
                <section className={classes.section1}>
                    <h1>MyWebLink</h1>
                </section>
                <section className={classes.section2}>
                    <form onSubmit={onSubmitHandler} className={classes.form}>
                        <div className={classes.control}>
                            <label htmlFor='email'>Enter the email with which you have Registered</label>
                            <input
                                type='email'
                                ref={valemailref}
                                id='loginemail'
                                placeholder='Email'
                                required />
                        </div>
                        <div className={classes.actions}>
                            {<button>Send Link</button>}
                            <label className={classes.label11}>
                                Alredy a user?
                                <NavLink className={classes.label11} to={'/signin'}>Login</NavLink>
                            </label>
                        </div>
                    </form>
                </section>
            </span>
        </section>
    )
}
export default Forgotpassword