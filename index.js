import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import AuthContexProvider from './Component/Store/Auth-Provider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <AuthContexProvider>
            <App />
        </AuthContexProvider>
    </BrowserRouter>
);
