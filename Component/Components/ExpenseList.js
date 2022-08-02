import React, { useState, useRef } from "react"
import { useDispatch } from "react-redux"
import classes from './ExpenseList.module.css'
import { expenseActions } from "../Store/Expense"
const ExpenseList = (props) => {
    const dispatch = useDispatch()
    const userEmail = localStorage.getItem('email')
    const [isediting, setIsediting] = useState(false)
    const descriptionRef = useRef()
    const AmountRef = useRef()
    const CategoryRef = useRef()
    const onsubmitHandler = async (event) => {
        event.preventDefault()
        const enteredAmount = AmountRef.current.value
        const enteredDescription = descriptionRef.current.value
        const enteredCategory = CategoryRef.current.value

        const inputDetails = {
            amount: enteredAmount,
            description: enteredDescription,
            category: enteredCategory
        }
        console.log(`https://expense-87421-default-rtdb.firebaseio.com//${userEmail}/${props.id}.json`)
        try {
            const response = await fetch(`https://expense-87421-default-rtdb.firebaseio.com//${userEmail}/${props.id}.json`, {
                method: 'PUT',
                body: JSON.stringify(inputDetails),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                throw new Error('Something went wrong! plz try again...');
            }
            const data = await response.json()
            console.log(data)
            props.retry((retry) => !retry)
            console.log('Expense successfuly edited')
            setIsediting(false)
        } catch (error) {
            console.log(error)
        }

    }

    const onCancelHandler = (event) => {
        event.preventDefault()
        setIsediting(false)
    }

    const onEditHandler = (event) => {
        event.preventDefault()
        setIsediting(true)
    }

    const onDeleteHandler = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(`https://expense-87421-default-rtdb.firebaseio.com//${userEmail}/${props.id}.json`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                throw new Error('Something went wrong! plz try again...');
            }
            const data = await response.json()
            console.log(data)
            props.retry((retry) => !retry)
            dispatch(expenseActions.removeItem(props.id))
            console.log('Expense successfuly deleted')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form onSubmit={onsubmitHandler}>
            <li className={classes.meal}>
                <div className={classes.expense}>
                    {!isediting && <h3>{props.description}</h3>}
                    {isediting && <input
                        type='text'
                        ref={descriptionRef}
                        id='description'
                        placeholder={props.description}
                        required />}
                    {!isediting && <div className={classes.description}>{props.category}</div>}
                    {isediting && <select
                        ref={CategoryRef}
                        id="category"
                        name="category"
                        placeholder="category"
                        required>
                        <option>Open this select menu</option>
                        <option value="Movie">Movie</option>
                        <option value="Grocery">Grocery</option>
                        <option value="school Fees">School Fees</option>
                        <option value="Bills and Payments">Bills and Payments</option>
                        <option value="Other">Other</option>
                    </select>}
                    {!isediting && <div className={classes.price}>{props.amount}</div>}
                    {isediting && <input
                        ref={AmountRef}
                        type='number'
                        id='amount'
                        placeholder={props.amount}
                        required />}
                </div>
                <div className={classes.expense1}>
                    {!isediting && <button onClick={onEditHandler} className={classes.expense1button1}>Edit</button>}
                    {isediting && <button className={classes.expense1button1}>Done</button>}
                    {!isediting && <button onClick={onDeleteHandler} className={classes.expense1button2}>Delete</button>}
                    {isediting && <button onClick={onCancelHandler} className={classes.expense1button2}>Cancel</button>}
                </div>
            </li>
        </form>
    )
}
export default ExpenseList