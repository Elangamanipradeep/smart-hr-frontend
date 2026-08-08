import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {

    return (

        <aside className="sidebar">

            <div className="sidebar-logo">

                <h3>Smart HR</h3>

            </div>

            <nav>

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

        </aside>

    );

}

export default Sidebar;