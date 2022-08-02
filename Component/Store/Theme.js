import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isPremium: false,
    changeTheme: false,
}

const themeSlice = createSlice({
    name: 'theme',
    initialState: initialState,
    reducers: {
        Premium(state) {
            state.isPremium = true
        },
        normal(state) {
            state.isPremium = false
        },
        switch(state) {
            state.changeTheme = !state.changeTheme
        }
    }
})

export const themeActions = themeSlice.actions;

export default themeSlice.reducer