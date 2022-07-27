import React, { useState, useContext, useEffect } from 'react';
import AddNewExpense from './AddNewExpense'
import ExpenseList from './ExpenseList';
import ExpenseContext from '../Store/Expense-context';
import classes from './Expenses.module.css'
const Expense = () => {
    const [showForm, setShowForm] = useState(false);
    const [expenseitem, setExpenseList] = useState();

    const ctx = useContext(ExpenseContext)

    const onFormShowHandler = () => {
        setShowForm(true)
    }
    useEffect(() => {
        const expenseList = ctx.item.map((expense) => (<ExpenseList
            key={Math.random().toString()}
            amount={expense.amount}
            description={expense.description}
            category={expense.category} />))
        setExpenseList(expenseList)
    }, [ctx.item])

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
                            </div>
                        </li>
                        {ctx.item.length === 0 && <p>No old expense..Add new..!</p>}
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