import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../src/styles/global.css";
import LoginPage from "../src/pages/auth/login";
import RegisterPage from "../src/pages/auth/register";
import ForgotPasswordPage from "../src/pages/auth/forgot-password";
import DashboardPage from "../src/pages/dashboard/dashboard";


export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/register" element={<RegisterPage />} />
                <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/dashboard" element={ <DashboardPage /> } />
            </Routes>
        </Router>
    );
}
