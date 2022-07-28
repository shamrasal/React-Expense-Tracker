import React, { useState, useContext, useEffect } from 'react';
import AddNewExpense from './AddNewExpense'
import ExpenseList from './ExpenseList';
import ExpenseContext from '../Store/Expense-context';
import classes from './Expenses.module.css'
const Expense = () => {
    const [showForm, setShowForm] = useState(false);
    const [expenseitem, setExpenseList] = useState();
    const ctx = useContext(ExpenseContext)
    const [retry, setRetry] = useState(false)
    const userEmail = localStorage.getItem('email')
    const onFormShowHandler = () => {
        setShowForm(true)
    }
    useEffect(() => {
        const fetchData = async () => {
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
                console.log(data)
                const loadedData = []
                for (const key in data) {
                    loadedData.push({
                        id: key,
                        amount: data[key].amount,
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
        }

        fetchData()

    }, [ctx.item, userEmail, retry])

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
                        <button onClick={onFormShowHandler}>Add New Expense</button>
                    </div>
                </section>
            </span>
        </section>
    )

}
export default Expense