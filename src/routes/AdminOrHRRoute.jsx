import { Navigate } from "react-router-dom";

function AdminOrHRRoute({ children }) {

    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("role");

    if (!token) {
        return <Navigate to="/" replace />;
    }

    if (role !== "Admin" && role !== "HR") {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}

export default AdminOrHRRoute;