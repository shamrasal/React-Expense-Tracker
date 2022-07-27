import React from "react"
import classes from './ExpenseList.module.css'
const ExpenseList = (props) => {
    return (
        <li className={classes.meal}>
            <div className={classes.expense}>
                <h3>{props.description}</h3>
                <div className={classes.description}>{props.category}</div>
                <div className={classes.price}>{props.amount}</div>
            </div>
        </li>
    )
}
export default ExpenseList