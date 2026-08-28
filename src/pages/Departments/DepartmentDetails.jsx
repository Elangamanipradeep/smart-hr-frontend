import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
    faArrowLeft,
    faBuilding,
    faUsers,
    faCode,
    faAlignLeft,
    faCalendarPlus,
    faClockRotateLeft,
    faPen,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DashboardLayout from "../../layouts/DashboardLayout";
import { getDepartment } from "../../services/departmentService";

import "./DepartmentDetails.css";


function DepartmentDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [department, setDepartment] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(false);

    useEffect(() => {

        loadDepartment();

    }, [id]);


    const loadDepartment = async () => {

        setLoading(true);

        setError(false);

        try {

            const response = await getDepartment(id);

            setDepartment(response);

        }

        catch (error) {

            console.log(error);

            setError(true);

        }

        finally {

            setLoading(false);

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
                    Loading department details...
                </p>

            </div>

        </DashboardLayout>

        );

    }

    if (error || !department) {

        return (

            <DashboardLayout>

                <div className="details-error-state">

                    <div className="details-error-icon">

                        <i className="fa-solid fa-triangle-exclamation"></i>

                    </div>

                    <h4>
                        Unable to Load Department
                    </h4>

                    <p>
                        Something went wrong while loading the department details.
                    </p>

                    <div className="d-flex justify-content-center gap-2">

                        <button
                            className="btn btn-primary"
                            onClick={loadDepartment}
                        >

                            <i className="fa-solid fa-rotate-right me-2"></i>

                            Try Again

                        </button>

                        <Link
                            to="/departments"
                            className="btn btn-outline-secondary"
                        >

                            Back to Departments

                        </Link>

                    </div>

                </div>

            </DashboardLayout>

        );

    }


    const formatDate = (date) => {

        if (!date) return "-";

        return new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

    };


    return (

        <DashboardLayout>

            <div className="department-details-page">

                {/* Page Header */}

                <div className="department-page-header justify-content-end">

                    {/* <div>

                        <h2>
                            Department Details
                        </h2>

                        <p>
                            View department information and details.
                        </p>

                    </div> */}

                    <Link
                        to="/departments"
                        className="department-back-btn"
                    >

                        <FontAwesomeIcon icon={faArrowLeft} />

                        <span>
                            Back to Departments
                        </span>

                    </Link>

                </div>


                {/* Department Overview */}

                <div className="department-overview-card">

                    <div className="department-overview-left">

                        <div className="department-main-icon">

                            <FontAwesomeIcon icon={faBuilding} />

                        </div>

                        <div>

                            <h3>
                                {department.name}
                            </h3>

                            <div className="department-code">

                                <FontAwesomeIcon icon={faCode} />

                                <span>
                                    {department.department_code}
                                </span>

                            </div>

                        </div>

                    </div>


                    <Link
                        to={`/departments/edit/${department.id}`}
                        className="department-edit-btn"
                    >

                        <FontAwesomeIcon icon={faPen} />

                        <span>
                            Edit Department
                        </span>

                    </Link>

                </div>


                {/* Information Cards */}

                <div className="department-info-grid">

                    {/* Basic Information */}

                    <div className="department-info-card">

                        <div className="department-card-header">

                            <div className="department-card-icon blue">

                                <FontAwesomeIcon icon={faBuilding} />

                            </div>

                            <div>

                                <h4>
                                    Department Information
                                </h4>

                                <p>
                                    Basic department details
                                </p>

                            </div>

                        </div>


                        <div className="department-info-list">

                            <div className="department-info-row">

                                <div className="department-info-label">

                                    <FontAwesomeIcon icon={faBuilding} />

                                    <span>
                                        Department Name
                                    </span>

                                </div>

                                <strong>
                                    {department.name}
                                </strong>

                            </div>


                            <div className="department-info-row">

                                <div className="department-info-label">

                                    <FontAwesomeIcon icon={faCode} />

                                    <span>
                                        Department Code
                                    </span>

                                </div>

                                <strong>
                                    {department.department_code}
                                </strong>

                            </div>

                        </div>

                    </div>


                    {/* Employee Information */}

                    <div className="department-info-card">

                        <div className="department-card-header">

                            <div className="department-card-icon purple">

                                <FontAwesomeIcon icon={faUsers} />

                            </div>

                            <div>

                                <h4>
                                    Employee Information
                                </h4>

                                <p>
                                    Employees assigned to department
                                </p>

                            </div>

                        </div>


                        <div className="department-employee-stat">

                            <div className="department-stat-icon">

                                <FontAwesomeIcon icon={faUsers} />

                            </div>

                            <div>

                                <span>
                                    Total Employees
                                </span>

                                <strong>
                                    {department.employee_count}
                                </strong>

                            </div>

                        </div>

                    </div>


                    {/* Description */}

                    <div className="department-info-card description-card">

                        <div className="department-card-header">

                            <div className="department-card-icon green">

                                <FontAwesomeIcon icon={faAlignLeft} />

                            </div>

                            <div>

                                <h4>
                                    Description
                                </h4>

                                <p>
                                    Department overview
                                </p>

                            </div>

                        </div>


                        <div className="department-description">

                            {department.description || "No description available."}

                        </div>

                    </div>


                    {/* Record Information */}

                    <div className="department-info-card">

                        <div className="department-card-header">

                            <div className="department-card-icon orange">

                                <FontAwesomeIcon icon={faCalendarPlus} />

                            </div>

                            <div>

                                <h4>
                                    Record Information
                                </h4>

                                <p>
                                    Department record details
                                </p>

                            </div>

                        </div>


                        <div className="department-info-list">

                            <div className="department-info-row">

                                <div className="department-info-label">

                                    <FontAwesomeIcon icon={faCalendarPlus} />

                                    <span>
                                        Created
                                    </span>

                                </div>

                                <strong>
                                    {formatDate(department.created_at)}
                                </strong>

                            </div>


                            <div className="department-info-row">

                                <div className="department-info-label">

                                    <FontAwesomeIcon icon={faClockRotateLeft} />

                                    <span>
                                        Last Updated
                                    </span>

                                </div>

                                <strong>
                                    {formatDate(department.updated_at)}
                                </strong>

                            </div>

                        </div>

                    </div>

                </div>


                {/* Bottom Action */}

                {/* <div className="department-bottom-actions">

                    <button
                        className="department-secondary-btn"
                        onClick={() => navigate("/departments")}
                    >

                        <FontAwesomeIcon icon={faArrowLeft} />

                        Back to Departments

                    </button>

                </div> */}

            </div>

        </DashboardLayout>

    );

}

export default DepartmentDetails;