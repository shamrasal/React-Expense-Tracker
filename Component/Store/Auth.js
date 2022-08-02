import { createSlice } from '@reduxjs/toolkit'

const initialToken = localStorage.getItem('token')
const initialEmail = localStorage.getItem('email')
const userIsLoggedIn = !!initialToken

const initialState = {
    token: initialToken,
    email: initialEmail,
    isLoggedIn: userIsLoggedIn,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true
            state.token = action.token
            state.email = action.email
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('email', action.payload.email)
        },
        logout(state) {
            state.isLoggedIn = false
            localStorage.removeItem('token')
            localStorage.removeItem('email')
        }
    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer