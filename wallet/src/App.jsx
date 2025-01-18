import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../src/styles/global.css";
import LoginPage from "../src/pages/auth/login";
import RegisterPage from "../src/pages/auth/register";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/register" element={<RegisterPage />} />
            </Routes>
        </Router>
    );
}
