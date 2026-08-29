import "./EmployeeDetails.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import { getEmployee } from "../../services/employeeService";
import { getEmployeeAIInsights } from "../../services/api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
    faArrowLeft,
    faPen,
    faEnvelope,
    faPhone,
    faBuilding,
    faBriefcase,
    faMoneyBill,
    faCalendar,
    faIdBadge,
    faCircleCheck,
    faCircleXmark,
    faRobot,
} from "@fortawesome/free-solid-svg-icons";


// function cleanAIResponse(text) {

//     if (!text) {
//         return "";
//     }

//     return text.replace(/\*\*/g, "").trim();
// }


function EmployeeDetailsComponent() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [employee, setEmployee] = useState(null);

    const [loading, setLoading] = useState(true);
    
    const [error, setError] = useState(false);

    const [aiInsights, setAiInsights] = useState("");

    const [aiLoading, setAiLoading] = useState(false);

    const [aiError, setAiError] = useState("");


    useEffect(() => {

        loadEmployee();

    }, []);


    const loadEmployee = async () => {

        setLoading(true);
        setError(false);

        try {

            const response = await getEmployee(id);

            setEmployee(response);

        }

        catch (error) {

            console.log(error);

            setError(true);

        }

        finally {

            setLoading(false);

        }

    };

    const handleGenerateAIInsights = async () => {

        if (!employee || aiLoading) {
            return;
        }

        setAiLoading(true);
        setAiError("");
        setAiInsights("");

        try {

            const response = await getEmployeeAIInsights(
                employee.id
            );

            setAiInsights(
                response.insights
            );

        } catch (error) {

            console.error(
                "Employee AI Insights Error:",
                error
            );

            if (error.response?.data?.error) {

                setAiError(
                    error.response.data.error
                );

            } else {

                setAiError(
                    "Unable to generate AI insights."
                );

            }

        } finally {

            setAiLoading(false);

        }

    };


    if (loading) {

        return (

            <DashboardLayout>

                <div className="details-loading-state">

                    <div
                        className="spinner-border text-primary"
                        role="status"
                    >

                        <span className="visually-hidden">
                            Loading...
                        </span>

                    </div>

                    <p>
                        Loading employee details...
                    </p>

                </div>

            </DashboardLayout>

        );

    }

    if (error || !employee) {

        return (

            <DashboardLayout>

                <div className="details-error-state">

                    <div className="details-error-icon">

                        <i className="fa-solid fa-triangle-exclamation"></i>

                    </div>

                    <h4>
                        Unable to Load Employee
                    </h4>

                    <p>
                        Something went wrong while loading the employee details.
                    </p>

                    <div className="d-flex justify-content-center gap-2">

                        <button
                            className="btn btn-primary"
                            onClick={loadEmployee}
                        >

                            <i className="fa-solid fa-rotate-right me-2"></i>

                            Try Again

                        </button>

                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => navigate("/employees")}
                        >

                            Back to Employees

                        </button>

                    </div>

                </div>

            </DashboardLayout>

        );

    }


    return (

        <div className="employee-details-page">


            {/* Header */}

            <div className="employee-details-header justify-content-end">

                {/* <div>

                    <h2>

                        Employee Details

                    </h2>

                    <p>

                        View employee profile and employment information.

                    </p>

                </div> */}


                <button
                    className="details-back-btn"
                    onClick={() => navigate("/employees")}
                >

                    <FontAwesomeIcon icon={faArrowLeft} />

                    <span>Back to Employees</span>

                </button>

            </div>


            {/* Profile Header */}

            <div className="employee-profile-card">

                <div className="employee-profile-main">

                    <img
                        src={employee.profile_photo}
                        alt={employee.full_name}
                        className="employee-profile-image"
                    />


                    <div className="employee-profile-info">

                        <h3>

                            {employee.full_name}

                        </h3>

                        <p className="employee-designation">

                            {employee.designation}

                        </p>

                        <span className="employee-id">

                            <FontAwesomeIcon icon={faIdBadge} />

                            {employee.employee_id}

                        </span>


                        <span
                            className={`employee-status ${
                                employee.is_active
                                    ? "active"
                                    : "inactive"
                            }`}
                        >

                            <FontAwesomeIcon
                                icon={
                                    employee.is_active
                                        ? faCircleCheck
                                        : faCircleXmark
                                }
                            />

                            {employee.is_active
                                ? "Active"
                                : "Inactive"
                            }

                        </span>

                    </div>

                </div>


                <button
                    className="details-edit-btn"
                    onClick={() =>
                        navigate(
                            `/employees/edit/${employee.id}`
                        )
                    }
                >

                    <FontAwesomeIcon icon={faPen} />

                    <span>Edit Employee</span>

                </button>

            </div>

            {/* AI Employee Insights */}

            <div className="employee-ai-insights-card">

                <div className="employee-ai-insights-header">

                    <div className="employee-ai-title">

                        <div className="employee-ai-icon">

                            <FontAwesomeIcon icon={faRobot} />

                        </div>

                        <div>

                            <h4>
                                AI Employee Insights
                            </h4>

                            <p>
                                Generate an AI-powered summary of this employee's HR profile.
                            </p>

                        </div>

                    </div>


                    <button
                        className="employee-ai-button"
                        onClick={handleGenerateAIInsights}
                        disabled={aiLoading}
                    >

                        <FontAwesomeIcon icon={faRobot} />

                        {aiLoading
                            ? "Generating..."
                            : "Generate AI Insight"
                        }

                    </button>

                </div>


                {aiError && (

                    <div className="employee-ai-error">

                        {aiError}

                    </div>

                )}


                {aiInsights && (

                    <div className="employee-ai-response">

                        <div className="employee-ai-response-title">

                            <FontAwesomeIcon icon={faRobot} />

                            AI Analysis

                        </div>

                        <div className="employee-ai-response-content">

                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {aiInsights}
                            </ReactMarkdown>

                        </div>

                    </div>

                )}

            </div>

            {/* Information Cards */}

            <div className="employee-info-grid">


                {/* Contact */}

                <div className="employee-info-card">

                    <div className="info-card-header">

                        <div className="info-card-icon blue">

                            <FontAwesomeIcon
                                icon={faEnvelope}
                            />

                        </div>

                        <div>

                            <h4>
                                Contact Information
                            </h4>

                            <p>
                                Employee contact details
                            </p>

                        </div>

                    </div>


                    <div className="info-item">

                        <span className="info-label">

                            <FontAwesomeIcon
                                icon={faEnvelope}
                            />

                            Email

                        </span>

                        <span className="info-value">

                            {employee.email}

                        </span>

                    </div>


                    <div className="info-item">

                        <span className="info-label">

                            <FontAwesomeIcon
                                icon={faPhone}
                            />

                            Phone

                        </span>

                        <span className="info-value">

                            {employee.phone}

                        </span>

                    </div>

                </div>


                {/* Employment */}

                <div className="employee-info-card">

                    <div className="info-card-header">

                        <div className="info-card-icon purple">

                            <FontAwesomeIcon
                                icon={faBriefcase}
                            />

                        </div>

                        <div>

                            <h4>
                                Employment Information
                            </h4>

                            <p>
                                Current employment details
                            </p>

                        </div>

                    </div>


                    <div className="info-item">

                        <span className="info-label">

                            <FontAwesomeIcon
                                icon={faBuilding}
                            />

                            Department

                        </span>

                        <span className="info-value">

                            {employee.department_name}

                        </span>

                    </div>


                    <div className="info-item">

                        <span className="info-label">

                            <FontAwesomeIcon
                                icon={faBriefcase}
                            />

                            Designation

                        </span>

                        <span className="info-value">

                            {employee.designation}

                        </span>

                    </div>

                </div>


                {/* Salary */}

                <div className="employee-info-card">

                    <div className="info-card-header">

                        <div className="info-card-icon green">

                            <FontAwesomeIcon
                                icon={faMoneyBill}
                            />

                        </div>

                        <div>

                            <h4>
                                Salary & Joining
                            </h4>

                            <p>
                                Compensation and joining details
                            </p>

                        </div>

                    </div>


                    <div className="info-item">

                        <span className="info-label">

                            <FontAwesomeIcon
                                icon={faMoneyBill}
                            />

                            Monthly Salary

                        </span>

                        <span className="info-value salary-value">

                            ₹ {Number(
                                employee.salary
                            ).toLocaleString("en-IN")}

                        </span>

                    </div>


                    <div className="info-item">

                        <span className="info-label">

                            <FontAwesomeIcon
                                icon={faCalendar}
                            />

                            Joining Date

                        </span>

                        <span className="info-value">

                            {new Date(employee.joining_date).toLocaleDateString(
                                "en-IN",
                                {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                }
                            )}

                        </span>

                    </div>

                </div>


                {/* Account Information */}

                <div className="employee-info-card">

                    <div className="info-card-header">

                        <div className="info-card-icon orange">

                            <FontAwesomeIcon
                                icon={faIdBadge}
                            />

                        </div>

                        <div>

                            <h4>
                                Record Information
                            </h4>

                            <p>
                                Employee record details
                            </p>

                        </div>

                    </div>


                    <div className="info-item">

                        <span className="info-label">

                            Employee ID

                        </span>

                        <span className="info-value">

                            {employee.employee_id}

                        </span>

                    </div>


                    <div className="info-item">

                        <span className="info-label">

                            Created

                        </span>

                        <span className="info-value">

                            {new Date(employee.created_at).toLocaleDateString(
                                "en-IN",
                                {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                }
                            )}

                        </span>

                    </div>


                    <div className="info-item">

                        <span className="info-label">

                            Last Updated

                        </span>

                        <span className="info-value">

                            {new Date(employee.updated_at).toLocaleDateString(
                                "en-IN",
                                {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                }
                            )}

                        </span>

                    </div>

                </div>

            </div>

        </div>

    );

}


export default EmployeeDetailsComponent;