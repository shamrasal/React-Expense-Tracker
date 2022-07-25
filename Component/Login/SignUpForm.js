import { useState, useRef, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom'
import classes from './SignUpForm.module.css';
import AuthContext from '../Store/Auth-contex';

const SignUpForm = () => {
    const authctx = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory()
    const enteredEmailRef = useRef('')
    const enteredPasswordRef = useRef('')
    const confirmPasswordRef = useRef('')

    const submitHandler = (event) => {
        event.preventDefault()
        const enteredEmail = enteredEmailRef.current.value
        const enteredPassword = enteredPasswordRef.current.value
        const confirmedPassword = confirmPasswordRef.current.value
        if (enteredPassword === confirmedPassword) {
            setIsLoading(true)
            fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDLwFZKg8KZEIlRPJ_FBc37TP7Vk45D3AE',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        email: enteredEmail,
                        password: enteredPassword,
                        returnSecureToken: true
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).then(res => {
                setIsLoading(false)
                if (res.ok) {
                    res.json().then(data => {
                        console.log('User has successfully signed up')
                        authctx.logIn(data.idToken)
                    })

                    history.replace('/signin')
                } else {
                    res.json().then(data => {
                        console.log(data)
                        let errorMessage = 'authentication failed...'
                        if (data && data.error && data.error.message) {
                            errorMessage = data.error.message
                        }
                        alert(errorMessage)
                    })
                }
            }).then(data => {
                console.log(data)

            }).catch(err => {
                console.log(err)
            })
            enteredEmailRef.current.value = ''
            enteredPasswordRef.current.value = ''
            confirmPasswordRef.current.value = ''

        } else {
            alert('password not match...')
            enteredEmailRef.current.value = ''
            enteredPasswordRef.current.value = ''
            confirmPasswordRef.current.value = ''
        }
    }

    return (
        <div>
            <section className={classes.auth}>
                <h1>{'Sign Up'}</h1>
                <form onSubmit={submitHandler}>
                    <div className={classes.control}>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' ref={enteredEmailRef} required />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' ref={enteredPasswordRef} required />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='password'>Confirm Password</label>
                        <input type='password' id='password1' ref={confirmPasswordRef} required />
                    </div>
                    <div className={classes.actions}>
                        {isLoading && <lable>Sending Request...</lable>}
                        {<button>{'Sign UP'}</button>}
                        <Link className={classes.toggle} to={'/signin'}>{'Login with existing account'}</Link>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default SignUpForm;