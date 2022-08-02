import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import classes from './AddNewExpense.module.css'
import { expenseActions } from '../Store/Expense'

const AddNewExpense = (props) => {
    const dispatch = useDispatch()
    const amountRef = useRef()
    const descriptionRef = useRef()
    const categoryRef = useRef()
    const cancelFormHandler = (event) => {
        event.preventDefault()
        props.setForm(false)
    }
    const onSubmitHandler = async (event) => {
        event.preventDefault()
        const enteredAmount = amountRef.current.value
        const enteredDescription = descriptionRef.current.value
        const enteredCategory = categoryRef.current.value

        const inputDetails = {
            amount: enteredAmount,
            description: enteredDescription,
            category: enteredCategory
        }
        console.log(inputDetails)

        const userEmail = localStorage.getItem('email')
        try {
            const response = await fetch(`https://expense-87421-default-rtdb.firebaseio.com//${userEmail}.json`, {
                method: 'POST',
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
            dispatch(expenseActions.addItem(inputDetails))
        } catch (error) {
            console.log(error)
        }

        console.log('hii')
        amountRef.current.value = ''
        descriptionRef.current.value = ''
        categoryRef.current.value = ''
    }
    return (
        <form onSubmit={onSubmitHandler} className={classes.form}>
            <div className={classes.control}>
                <label htmlFor='email'>Amount</label>
                <input
                    ref={amountRef}
                    type='number'
                    id='amount'
                    placeholder='Amount'
                    required />
                <label htmlFor='email'>Description</label>
                <input
                    ref={descriptionRef}
                    type='text'
                    id='Description'
                    placeholder='Description'
                    required />
                <label htmlFor='email'>Category</label>
                <select
                    ref={categoryRef}
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
                </select>
            </div>
            <div className={classes.actions}>
                <button>Add</button>
                <button onClick={cancelFormHandler}>Cancel</button>
            </div>
        </form>
    )
}
export default AddNewExpense