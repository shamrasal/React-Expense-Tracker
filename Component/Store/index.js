import { configureStore } from '@reduxjs/toolkit';

import authReducer from './Auth'
import ExpenseReducer from './Expense'
import ThemeReducer from './Theme'



const store = configureStore({
    reducer: { expense: ExpenseReducer, auth: authReducer, theme: ThemeReducer },
});

export default store