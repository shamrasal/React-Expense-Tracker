import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddNewExpense from './AddNewExpense'
import ExpenseList from './ExpenseList';
import { expenseActions } from '../Store/Expense';
import classes from './Expenses.module.css'
const Expense = () => {
    const [showForm, setShowForm] = useState(false);
    const ctxitem = useSelector(state => state.expense.item)
    const ctxamont = useSelector(state => state.expense.totalAmount)
    console.log(ctxamont)
    console.log(ctxitem)
    const dispatch = useDispatch()
    const [expenseitem, setExpenseList] = useState();
    const [retry, setRetry] = useState(false)
    const userEmail = localStorage.getItem('email')
    const onFormShowHandler = () => {
        setShowForm(true)
    }
    useEffect(() => {
        const fetchData = async () => {
            let totalamount = 0
            try {
                const response = await fetch(`https://expense-87421-default-rtdb.firebaseio.com//${userEmail}.json`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (!response.ok) {
                    throw new Error('Something went wrong! plz try again...');
                }
                const data = await response.json()
                const loadedData = []
                for (const key in data) {
                    totalamount = totalamount + +data[key].amount
                    loadedData.push({
                        id: key,
                        amount: data[key].amount,
                        totalAmount: totalamount,
                        description: data[key].description,
                        category: data[key].category,
                    })
                }
                const expenseList = loadedData.map((expense) => (<ExpenseList
                    key={expense.id}
                    id={expense.id}
                    amount={expense.amount}
                    description={expense.description}
                    retry={setRetry}
                    category={expense.category} />))
                setExpenseList(expenseList)
                console.log(expenseList)
            } catch (error) {
                console.log(error)
            }
            dispatch(expenseActions.totalPrice(totalamount))

        }
        fetchData()

    }, [ctxitem, userEmail, retry, dispatch])

    return (
        <section className={classes.auth}>
            {/* {isLoading && <LoadingSpinner></LoadingSpinner>} */}
            <span className={classes.span1}>
                {showForm && <AddNewExpense setForm={setShowForm}></AddNewExpense>}
            </span>
            <span className={classes.span2}>
                <section className={classes.section1}>
                    <h1>Old Expenses</h1>
                    <ul>
                        <li className={classes.meal}>
                            <div className={classes.expense}>
                                <h3>{'Description'}</h3>
                                <div className={classes.description}>{'Category'}</div>
                                <div className={classes.price}>{'Amount'}</div>
                                <div>  </div>
                            </div>
                        </li>
                        {expenseitem}
                    </ul>
                </section>
                <section className={classes.section2}>
                    <div className={classes.actions}>
                        {ctxamont > 10000 && <button className={classes.but} onClick={onFormShowHandler}>Activate Premium</button>}
                        <button className={classes.but1} onClick={onFormShowHandler}>Add New Expense</button>
                    </div>
                </section>
            </span>
        </section>
    )

}
export default Expense