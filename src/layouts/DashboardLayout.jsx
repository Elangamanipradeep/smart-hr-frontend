import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import "./DashboardLayout.css";

function DashboardLayout({ children }) {

    const navigate = useNavigate();

    const location = useLocation();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const logout = () => {

        localStorage.clear();

        navigate("/");

    };

    const pageTitle = () => {

        if (location.pathname.includes("/employees"))
            return "Employees";

        if (location.pathname.includes("/departments"))
            return "Departments";

        if (location.pathname.includes("/profile"))
            return "Profile";

        return "Dashboard";

    };

    return (

        <div className="layout">

            <div
                className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`}
                onClick={() => setSidebarOpen(false)}
            ></div>

            <aside className={`sidebar ${sidebarOpen ? "show" : ""}`}>

                <div className="sidebar-header">

                    <h2>Smart HR</h2>

                    <p>Employee Management System</p>

                </div>

                <nav className="sidebar-nav">

                    <NavLink to="/dashboard">
                        Dashboard
                    </NavLink>

                    <NavLink to="/employees">
                        Employees
                    </NavLink>

                    <NavLink to="/departments">
                        Departments
                    </NavLink>

                    <NavLink to="/profile">
                        Profile
                    </NavLink>

                </nav>

                <div className="sidebar-footer">

                    <button
                        className="btn btn-danger w-100"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </aside>

            <main className="main-content">

                <header className="topbar">

                    <button
                        className="menu-btn"
                        onClick={() => setSidebarOpen(true)}
                    >
                        ☰
                    </button>

                    <div>

                        <h3 className="page-title">

                            {pageTitle()}

                        </h3>

                        <small className="text-muted">

                            Welcome back 👋

                        </small>

                    </div>

                </header>

                <section className="page-content">

                    {children || <Outlet />}

                </section>

            </main>

        </div>

    );

}

export default DashboardLayout;