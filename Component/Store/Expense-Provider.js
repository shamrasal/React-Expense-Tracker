import React, { useState } from "react";
import ExpenseContext from "./Expense-context";

const ExpenseProvider = (props) => {
    const [items, setItems] = useState([]);
    const userEmail = localStorage.getItem('email')
    const addItemHandler = async (item) => {

        try {
            const response = await fetch(`https://expense-87421-default-rtdb.firebaseio.com//${userEmail}.json`, {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                throw new Error('Something went wrong! plz try again...');
            }
            const data = await response.json()
            console.log(data)
            setItems((prev) => {
                return [...prev, item]
            })

        } catch (error) {
            console.log(error)
        }
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