import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUsers,
    faUserCheck,
    faUserXmark,
    faBuilding,
    faIndianRupeeSign,
    faChartLine,
    faArrowUp,
    faArrowDown,
    faPlus,
    faArrowRight,
    faUserTie,
} from "@fortawesome/free-solid-svg-icons";

import DashboardLayout from "../../layouts/DashboardLayout";
import { getDashboardData } from "../../services/dashboardService";

import EmployeeStatusChart from "../../components/Dashboard/EmployeeStatusChart";
import DepartmentChart from "../../components/Dashboard/DepartmentChart";

import "./Dashboard.css";


function Dashboard() {

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {

        loadDashboard();

    }, []);


    const loadDashboard = async () => {

        try {

            const response = await getDashboardData();

            setDashboard(response);

        }

        catch (error) {

            console.log(error);

        }

    };


    if (!dashboard) {

        return (

            <DashboardLayout>

                <div className="dashboard-loading">

                    <div className="spinner-border text-primary"></div>

                    <p>Loading dashboard...</p>

                </div>

            </DashboardLayout>

        );

    }


    const formatCurrency = (value) => {

        return `₹${Number(value || 0).toLocaleString("en-IN")}`;

    };


    return (

        <DashboardLayout>

            <div className="dashboard-page">



                {/* =========================
                    Statistics
                ========================= */}

                <div className="dashboard-stats">


                    {/* Total Employees */}

                    <div className="stat-card">

                        <div className="stat-card-top">

                            <div className="stat-icon blue">

                                <FontAwesomeIcon icon={faUsers} />

                            </div>

                        </div>

                        <div className="stat-content">

                            <span>Total Employees</span>

                            <strong>

                                {dashboard.total_employees}

                            </strong>

                        </div>

                    </div>


                    {/* Active Employees */}

                    <div className="stat-card">

                        <div className="stat-card-top">

                            <div className="stat-icon green">

                                <FontAwesomeIcon icon={faUserCheck} />

                            </div>

                        </div>

                        <div className="stat-content">

                            <span>Active Employees</span>

                            <strong>

                                {dashboard.active_employees}

                            </strong>

                        </div>

                    </div>


                    {/* Inactive Employees */}

                    <div className="stat-card">

                        <div className="stat-card-top">

                            <div className="stat-icon red">

                                <FontAwesomeIcon icon={faUserXmark} />

                            </div>

                        </div>

                        <div className="stat-content">

                            <span>Inactive Employees</span>

                            <strong>

                                {dashboard.inactive_employees}

                            </strong>

                        </div>

                    </div>


                    {/* Departments */}

                    <div className="stat-card">

                        <div className="stat-card-top">

                            <div className="stat-icon purple">

                                <FontAwesomeIcon icon={faBuilding} />

                            </div>

                        </div>

                        <div className="stat-content">

                            <span>Departments</span>

                            <strong>

                                {dashboard.total_departments}

                            </strong>

                        </div>

                    </div>

                </div>


                {/* =========================
                    Main Dashboard Grid
                ========================= */}

                <div className="dashboard-grid">


                    {/* Department Chart */}

                    <div className="dashboard-panel">

                        <div className="panel-header">

                            <div>

                                <h3>

                                    Employees by Department

                                </h3>

                                <p>

                                    Employee distribution across departments

                                </p>

                            </div>

                        </div>

                        <div className="chart-container">

                            <DepartmentChart
                                departments={
                                    dashboard.department_statistics
                                }
                            />

                        </div>

                    </div>


                    {/* Employee Status */}

                    <div className="dashboard-panel">

                        <div className="panel-header">

                            <div>

                                <h3>

                                    Employee Status

                                </h3>

                                <p>

                                    Current employee status overview

                                </p>

                            </div>

                        </div>

                        <div className="chart-container">

                            <EmployeeStatusChart
                                active={
                                    dashboard.active_employees
                                }
                                inactive={
                                    dashboard.inactive_employees
                                }
                            />

                        </div>

                    </div>


                </div>


                {/* =========================
                    Salary Overview
                ========================= */}

                <div className="dashboard-panel salary-panel">

                    <div className="panel-header">

                        <div>

                            <h3>

                                Salary Overview

                            </h3>

                            <p>

                                Current salary statistics

                            </p>

                        </div>

                        <div className="salary-header-icon">

                            <FontAwesomeIcon
                                icon={faIndianRupeeSign}
                            />

                        </div>

                    </div>


                    <div className="salary-grid">


                        <div className="salary-item">

                            <div className="salary-item-icon">

                                <FontAwesomeIcon
                                    icon={faIndianRupeeSign}
                                />

                            </div>

                            <div>

                                <span>Total Salary</span>

                                <strong>

                                    {formatCurrency(
                                        dashboard.total_salary
                                    )}

                                </strong>

                            </div>

                        </div>


                        <div className="salary-item">

                            <div className="salary-item-icon">

                                <FontAwesomeIcon
                                    icon={faChartLine}
                                />

                            </div>

                            <div>

                                <span>Average Salary</span>

                                <strong>

                                    {formatCurrency(
                                        dashboard.average_salary
                                    )}

                                </strong>

                            </div>

                        </div>


                        <div className="salary-item">

                            <div className="salary-item-icon">

                                <FontAwesomeIcon
                                    icon={faArrowUp}
                                />

                            </div>

                            <div>

                                <span>Highest Salary</span>

                                <strong>

                                    {formatCurrency(
                                        dashboard.highest_salary
                                    )}

                                </strong>

                            </div>

                        </div>


                        <div className="salary-item">

                            <div className="salary-item-icon">

                                <FontAwesomeIcon
                                    icon={faArrowDown}
                                />

                            </div>

                            <div>

                                <span>Lowest Salary</span>

                                <strong>

                                    {formatCurrency(
                                        dashboard.lowest_salary
                                    )}

                                </strong>

                            </div>

                        </div>


                    </div>

                </div>


                {/* =========================
                    Bottom Section
                ========================= */}

                <div className="dashboard-bottom-grid">


                    {/* Quick Actions */}

                    <div className="dashboard-panel">

                        <div className="panel-header">

                            <div>

                                <h3>

                                    Quick Actions

                                </h3>

                                <p>

                                    Frequently used actions

                                </p>

                            </div>

                        </div>


                        <div className="quick-actions">


                            <Link
                                to="/employees/create"
                                className="quick-action"
                            >

                                <div className="quick-action-icon blue">

                                    <FontAwesomeIcon
                                        icon={faPlus}
                                    />

                                </div>

                                <div>

                                    <strong>

                                        Add Employee

                                    </strong>

                                    <span>

                                        Create a new employee

                                    </span>

                                </div>

                                <FontAwesomeIcon
                                    icon={faArrowRight}
                                    className="quick-arrow"
                                />

                            </Link>


                            <Link
                                to="/departments/create"
                                className="quick-action"
                            >

                                <div className="quick-action-icon purple">

                                    <FontAwesomeIcon
                                        icon={faPlus}
                                    />

                                </div>

                                <div>

                                    <strong>

                                        Add Department

                                    </strong>

                                    <span>

                                        Create a new department

                                    </span>

                                </div>

                                <FontAwesomeIcon
                                    icon={faArrowRight}
                                    className="quick-arrow"
                                />

                            </Link>


                            <Link
                                to="/employees"
                                className="quick-action"
                            >

                                <div className="quick-action-icon green">

                                    <FontAwesomeIcon
                                        icon={faUsers}
                                    />

                                </div>

                                <div>

                                    <strong>

                                        View Employees

                                    </strong>

                                    <span>

                                        Manage employees

                                    </span>

                                </div>

                                <FontAwesomeIcon
                                    icon={faArrowRight}
                                    className="quick-arrow"
                                />

                            </Link>


                        </div>

                    </div>


                    {/* Recent Employees */}

                    <div className="dashboard-panel recent-panel">

                        <div className="panel-header">

                            <div>

                                <h3>

                                    Recent Employees

                                </h3>

                                <p>

                                    Recently added employees

                                </p>

                            </div>

                            <Link
                                to="/employees"
                                className="view-all"
                            >

                                View All

                                <FontAwesomeIcon
                                    icon={faArrowRight}
                                />

                            </Link>

                        </div>


                        <div className="recent-employees">

                            {
                                dashboard.recent_employees.length === 0
                                    ? (

                                        <div className="empty-dashboard">

                                            No employees found.

                                        </div>

                                    )
                                    : (

                                        dashboard.recent_employees.map(
                                            (employee) => {

                                                const profileImage =
                                                    employee.profile_photo
                                                        ? employee.profile_photo.startsWith("http")
                                                            ? employee.profile_photo
                                                            : `http://127.0.0.1:8000${employee.profile_photo}`
                                                        : "/images/default-employee.png";


                                                return (

                                                    <div
                                                        key={employee.id}
                                                        className="recent-employee"
                                                    >

                                                        {/* Employee Image */}

                                                        <img
                                                            src={profileImage}
                                                            alt={employee.full_name}
                                                            className="recent-employee-avatar"
                                                            onError={(event) => {

                                                                event.currentTarget.src =
                                                                    "/images/default-employee.png";

                                                            }}
                                                        />


                                                        {/* Employee Information */}

                                                        <div className="employee-info">

                                                            <strong>

                                                                {employee.full_name}

                                                            </strong>

                                                            <span>

                                                                {employee.employee_id}

                                                            </span>

                                                        </div>


                                                        {/* Designation */}

                                                        <div className="employee-designation">

                                                            {employee.designation}

                                                        </div>


                                                        {/* Status */}

                                                        <span
                                                            className={`employee-status ${
                                                                employee.is_active
                                                                    ? "active"
                                                                    : "inactive"
                                                            }`}
                                                        >

                                                            {employee.is_active
                                                                ? "Active"
                                                                : "Inactive"}

                                                        </span>

                                                    </div>

                                                );

                                            }
                                        )

                                    )
                            }

                        </div>

                    </div>

                </div>


            </div>

        </DashboardLayout>

    );

}

export default Dashboard;