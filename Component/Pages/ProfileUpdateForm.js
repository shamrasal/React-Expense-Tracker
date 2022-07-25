import React, { useState, useRef, useContext, useEffect } from 'react'
import AuthContext from '../Store/Auth-contex'
import classes from './ProfileUpdateForm.module.css'
const ProfileUpdateForm = () => {
    const fullnameref = useRef('')
    const ProfilePhotoRef = useRef('')
    const [retry, setRetry] = useState(false)
    const [updated, setUpdated] = useState(false)
    const ctx = useContext(AuthContext)

    useEffect(() => {
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDLwFZKg8KZEIlRPJ_FBc37TP7Vk45D3AE',
            {
                method: 'POST',
                body: JSON.stringify({
                    idToken: ctx.token,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => {
            if (res.ok) {
                res.json().then(data => {
                    fullnameref.current.value = data.users[0].displayName
                    ProfilePhotoRef.current.value = data.users[0].photoUrl
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

    }, [ctx.token, retry]);

    const onSubmitHandler = (event) => {
        event.preventDefault()
        const enteredFullName = fullnameref.current.value
        const enteredPhotoUrl = ProfilePhotoRef.current.value

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDLwFZKg8KZEIlRPJ_FBc37TP7Vk45D3AE',
            {
                method: 'POST',
                body: JSON.stringify({
                    idToken: ctx.token,
                    displayName: enteredFullName,
                    photoUrl: enteredPhotoUrl,
                    returnSecureToken: false
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => {
            if (res.ok) {
                res.json().then(data => {
                    console.log('Profile Updated')
                    console.log(data)
                    setUpdated(true)
                    setRetry((retry) => !retry)
                })
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
        fullnameref.current.value = ''
        ProfilePhotoRef.current.value = ''
    }

    return (
        <div className={classes.home}>
            <span className={classes.span1}>
                <div className={classes.name}>
                    <p>"Winners Never Quite..Quiters never win.."</p>
                </div>
                <div className={classes.update}>
                    <div className={classes.button}>
                        {!updated && 'your profile is 64% completed'}
                        {updated && 'your profile is 100% completed'}
                    </div>
                </div>
            </span>
            <span className={classes.span2}>
                <form onSubmit={onSubmitHandler} className={classes.form}>
                    <div className={classes.control}>
                        <label htmlFor='fullname'>Contact Details</label>
                        <button className={classes.buttonl1}>Cancel</button>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='fullname'>Full Name</label>
                        <input type='text' id='fullname' ref={fullnameref} required />
                        <label htmlFor='ProfilePhoto'>Profile Photo URL</label>
                        <input type='text' id='ProfilePhoto' ref={ProfilePhotoRef} required />
                    </div>
                    <div className={classes.actions}>
                        <button className={classes.buttonl2}>Update</button>
                        {updated && <p>Profile Updated successfully</p>}
                    </div>
                </form>
            </span>
        </div>
    )
}

export default ProfileUpdateForm