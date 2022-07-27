import React from "react"

const ExpenseContext = React.createContext({
    item: [],
    addItem: (item) => { },
    removeItem: (id) => { },
    updateItem: (id) => { }
})

export default ExpenseContext