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
import { getHRInsights } from "../../services/api";

import EmployeeStatusChart from "../../components/Dashboard/EmployeeStatusChart";
import DepartmentChart from "../../components/Dashboard/DepartmentChart";

import "./Dashboard.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// function cleanAIResponse(text) {

//     if (!text) {
//         return "";
//     }

//     return text.replace(/\*\*/g, "").trim();
// }

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);
    
    const [aiInsights, setAiInsights] = useState("");

    const [aiLoading, setAiLoading] = useState(false);

    const [aiError, setAiError] = useState("");

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

    const handleGenerateAIInsights = async () => {

        if (aiLoading) {
            return;
        }

        setAiLoading(true);
        setAiError("");
        setAiInsights("");

        try {

            const response = await getHRInsights();

            setAiInsights(
                response.insights
            );

        } catch (error) {

            console.log(error);

            setAiError(
                "Unable to generate AI HR insights."
            );

        } finally {

            setAiLoading(false);

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
                    AI HR Insights
                ========================= */}

                <div className="dashboard-panel ai-insights-panel">

                    <div className="panel-header">

                        <div>

                            <h3>
                                🤖 AI HR Insights
                            </h3>

                            <p>
                                AI-powered analysis of your organization's HR data
                            </p>

                        </div>

                        <button
                            type="button"
                            className="ai-insights-button"
                            onClick={handleGenerateAIInsights}
                            disabled={aiLoading}
                        >

                            {aiLoading
                                ? "Analyzing..."
                                : "Generate Insights"
                            }

                        </button>

                    </div>


                    {/* Loading */}

                    {aiLoading && (

                        <div className="ai-insights-loading">

                            <div className="spinner-border text-primary"></div>

                            <p>
                                Analyzing HR data...
                            </p>

                        </div>

                    )}


                    {/* Error */}

                    {aiError && (

                        <div className="ai-insights-error">

                            {aiError}

                        </div>

                    )}


                    {/* AI Response */}

                    {aiInsights && !aiLoading && (

                        <div className="ai-insights-content">

                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {aiInsights}
                            </ReactMarkdown>

                        </div>

                    )}


                    {/* Initial State */}

                    {!aiInsights && !aiLoading && !aiError && (

                        <div className="ai-insights-empty">

                            <div className="ai-insights-empty-icon">
                                🤖
                            </div>

                            <p>
                                Generate AI insights to discover important
                                patterns and observations from your HR data.
                            </p>

                        </div>

                    )}

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
                                                        ? employee.profile_photo
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