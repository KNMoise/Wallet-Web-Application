import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/auth/login');
    }, [navigate]);

    return null;
}
