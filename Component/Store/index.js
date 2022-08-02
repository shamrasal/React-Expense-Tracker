import { configureStore } from '@reduxjs/toolkit';

import authReducer from './Auth'
import ExpenseReducer from './Expense'


const store = configureStore({
    reducer: { expense: ExpenseReducer, auth: authReducer },
});

export default store