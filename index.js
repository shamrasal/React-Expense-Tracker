import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import AuthContexProvider from './Component/Store/Auth-Provider';
import ExpenseProvider from './Component/Store/Expense-Provider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <ExpenseProvider>
            <AuthContexProvider>
                <App />
            </AuthContexProvider>
        </ExpenseProvider>
    </BrowserRouter>
);
