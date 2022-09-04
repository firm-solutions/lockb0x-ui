import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth()
    const TOKEN = JSON.parse(localStorage.getItem('tokenData'));
    console.log("object121212", JSON.stringify(TOKEN));
    const location = useLocation
    return (
        TOKEN
            ? <Outlet />
            : <Navigate to="/login"  replace />
    )
}

export default RequireAuth