import React, { useState, useContext } from "react";
import AuthContext from "./Auth-contex";
import ExpenseContext from "./Expense-context";

const ExpenseProvider = (props) => {
    const [items, setItems] = useState([]);
    const ctx = useContext(AuthContext)
    console.log(ctx)

    const addItemHandler = (item) => {
        setItems((prev) => {
            return [...prev, item]
        })

    }

    const updateItemHandler = (item) => {
        setItems((prev) => {
            return [...prev]
        })

    }

    const removeItemHandler = (id) => {
        const updatedItems = items.filter(items => items.id !== id)
        console.log(updatedItems)
        setItems(updatedItems)
    }



    const expenseContext = {
        item: items,
        addItem: addItemHandler,
        updateItem: updateItemHandler,
        removeItem: removeItemHandler
    }

    return (
        <ExpenseContext.Provider value={expenseContext}>
            {console.log(expenseContext)}
            {props.children}
        </ExpenseContext.Provider>
    )

}

export default ExpenseProvider