import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    item: [],
    totalAmount: 0
}

const expenseSlice = createSlice({
    name: 'expense',
    initialState: initialState,
    reducers: {
        addItem(state, action) {
            console.log(action.payload)
            state.item = [...state.item, action.payload]
            console.log(state.item)
        },
        removeItem(state, action) {
            const updatedItems = state.item.filter(items => items.id !== action.payload)
            console.log(updatedItems)
            state.item = updatedItems
        },
        totalPrice(state, action) {
            state.totalAmount = action.payload
        }
    }
})

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer