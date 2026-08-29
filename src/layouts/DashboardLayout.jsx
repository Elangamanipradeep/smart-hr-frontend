import {
    faBars,
    faBuilding,
    faChartPie,
    faRightFromBracket,
    faRobot,
    faUser,
    faUserShield,
    faUsers,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    NavLink,
    Outlet,
    useLocation,
    useNavigate,
} from "react-router-dom";

import { useEffect, useState } from "react";

import { getProfile } from "../services/authService";

import smartHrLogoFull from "../assets/smart-hr-logo-full.png";
import smartHrLogoIcon from "../assets/smart-hr-logo-icon.png";

import "./DashboardLayout.css";


function DashboardLayout({ children }) {

    const navigate = useNavigate();

    const location = useLocation();


    /* ==============================
       Sidebar
       ============================== */

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);


    /* ==============================
       User
       ============================== */

    const [role, setRole] = useState(
        localStorage.getItem("role") || ""
    );

    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        username: "",
    });


    /* ==============================
       Load Profile
       ============================== */

    useEffect(() => {

        loadProfile();

    }, []);


    const loadProfile = async () => {

        try {

            const response = await getProfile();

            setRole(response.role);

            setUser(response);

            localStorage.setItem(
                "role",
                response.role
            );

        }

        catch (error) {

            console.log(error);

        }

    };


    /* ==============================
       Logout
       ============================== */

    const logout = () => {

        localStorage.clear();

        navigate("/");

    };


    /* ==============================
       Page Title
       ============================== */

    const pageTitle = () => {

        if (location.pathname === "/employees/create")
            return "Add Employee";

        if (location.pathname.includes("/employees/edit/"))
            return "Edit Employee";

        if (location.pathname.includes("/employees/view/"))
            return "Employee Details";

        if (location.pathname === "/employees")
            return "Employees";

        if (location.pathname.includes("/departments/edit/"))
            return "Edit Department";

        if (location.pathname === "/departments/create")
            return "Add Department";

        if (location.pathname.includes("/departments/view/"))
            return "Department Details";

        if (location.pathname === "/departments")
            return "Departments";

        if (location.pathname === "/ai-assistant")
            return "AI HR Assistant";

        if (location.pathname.includes("/users/edit/"))
            return "Edit User";

        if (location.pathname === "/users/create")
            return "Add User";

        if (location.pathname.includes("/users"))
            return "Users";

        if (location.pathname.includes("/profile"))
            return "Profile";

        return "Dashboard";

    };

    const pageSubtitle = () => {

        if (location.pathname === "/employees/create")
            return "Add a new employee to your organization.";

        if (location.pathname.includes("/employees/edit/"))
            return "Update employee information.";

        if (location.pathname.includes("/employees/view/"))
            return "View employee information.";

        if (location.pathname === "/employees")
            return "Manage your organization efficiently.";

        if (location.pathname.includes("/departments"))
            return "Manage your organization departments.";

        if (location.pathname.includes("/users"))
            return "Manage HR users and access.";

        if (location.pathname.includes("/profile"))
            return "Manage your profile information.";

        if (location.pathname === "/ai-assistant")
            return "Ask questions about your HR data.";

        return "Manage your organization efficiently.";

    };


    /* ==============================
       Close mobile sidebar
       ============================== */

    const closeMobileSidebar = () => {

        setSidebarOpen(false);

    };


    /* ==============================
       Navigation
       ============================== */

    const navigationItems = [

        {
            name: "Dashboard",
            path: "/dashboard",
            icon: faChartPie,
        },

        {
            name: "Employees",
            path: "/employees",
            icon: faUsers,
        },

        {
            name: "Departments",
            path: "/departments",
            icon: faBuilding,
        },

        {
            name: "AI Assistant",
            path: "/ai-assistant",
            icon: faRobot,
        },

        ...(role === "Admin"
            ? [
                {
                    name: "Users",
                    path: "/users",
                    icon: faUserShield,
                },
            ]
            : []),

        {
            name: "Profile",
            path: "/profile",
            icon: faUser,
        },

    ];


    return (

        <div className="layout">


            {/* ==============================
                Mobile Overlay
               ============================== */}

            <div
                className={`sidebar-overlay ${
                    sidebarOpen ? "show" : ""
                }`}
                onClick={closeMobileSidebar}
            />


            {/* ==============================
                Sidebar
               ============================== */}

            <aside
                className={`
                    sidebar
                    ${sidebarOpen ? "show" : ""}
                    ${sidebarCollapsed ? "collapsed" : ""}
                `}
            >


                {/* Brand */}

                <div className="sidebar-header">

                    <img
                        src={smartHrLogoFull}
                        alt="Smart HR"
                        className="brand-logo-full"
                    />

                    <img
                        src={smartHrLogoIcon}
                        alt="Smart HR"
                        className="brand-logo-icon"
                    />

                </div>


                {/* Navigation */}

                <nav className="sidebar-nav">

                    <div className="nav-section-title">

                        MENU

                    </div>


                    {navigationItems.map((item) => (

                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={
                                item.path === "/dashboard" ||
                                item.path === "/users" ||
                                item.path === "/profile"
                            }
                            className={({ isActive }) =>
                                `sidebar-link ${
                                    isActive ? "active" : ""
                                }`
                            }
                            onClick={closeMobileSidebar}
                            data-tooltip={item.name}
                        >

                            <span className="sidebar-icon">

                                <FontAwesomeIcon
                                    icon={item.icon}
                                />

                            </span>

                            <span className="sidebar-label">

                                {item.name}

                            </span>

                        </NavLink>

                    ))}

                </nav>


                {/* User */}

                <div className="sidebar-user">

                    <div className="user-avatar">

                        <FontAwesomeIcon icon={faUser} />

                    </div>


                    <div className="user-info">

                        <div className="user-name">

                            {user.first_name || user.username}

                            {user.last_name
                                ? ` ${user.last_name}`
                                : ""
                            }

                        </div>

                        <div className="user-role">

                            {role || "User"}

                        </div>

                    </div>

                </div>


                {/* Footer */}

                <div className="sidebar-footer">

                    <button
                        className="logout-button"
                        onClick={logout}
                    >

                        <span className="sidebar-icon">

                            <FontAwesomeIcon
                                icon={faRightFromBracket}
                            />

                        </span>

                        <span className="sidebar-label">

                            Logout

                        </span>

                    </button>

                </div>

            </aside>


            {/* ==============================
                Main Content
               ============================== */}

            <main className="main-content">


                {/* Topbar */}

                <header className="topbar">


                    <button
                        className="sidebar-toggle"
                        onClick={() =>
                            setSidebarCollapsed(
                                !sidebarCollapsed
                            )
                        }
                        aria-label={
                            sidebarCollapsed
                                ? "Expand sidebar"
                                : "Collapse sidebar"
                        }
                    >

                        <FontAwesomeIcon
                            icon={
                                sidebarCollapsed
                                    ? faXmark
                                    : faBars
                            }
                        />

                    </button>


                    {/* Mobile menu button */}

                    <button
                        className="mobile-menu-button"
                        onClick={() =>
                            setSidebarOpen(true)
                        }
                        aria-label="Open menu"
                    >

                        <FontAwesomeIcon
                            icon={faBars}
                        />

                    </button>


                    <div className="topbar-content">

                        <h3 className="page-title">

                            {pageTitle()}

                        </h3>

                        <p className="page-subtitle">

                            {pageSubtitle()}

                        </p>

                    </div>

                </header>


                {/* Page */}

                <section className="page-content">

                    {children || <Outlet />}

                </section>


            </main>

        </div>

    );

}


export default DashboardLayout;