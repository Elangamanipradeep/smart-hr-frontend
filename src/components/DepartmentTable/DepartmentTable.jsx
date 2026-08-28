import "./DepartmentTable.css";

import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import { deleteDepartment } from "../../services/departmentService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faEye,
    faPen,
    faTrash,
    faBuilding,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";


function DepartmentTable({
    departments,
    loadDepartments,
    loading,
    error
}) {


    const handleDelete = async (id) => {

        const result = await Swal.fire({

            title: "Delete Department?",

            text: "This department will be removed permanently.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: "#dc3545",

            confirmButtonText: "Delete",

        });


        if (!result.isConfirmed) return;


        try {

            await deleteDepartment(id);


            Swal.fire({

                icon: "success",

                title: "Deleted",

                text: "Department deleted successfully.",

                timer: 1500,

                showConfirmButton: false,

            });


            loadDepartments();

        }

        catch (error) {

            Swal.fire({

                icon: "error",

                title: "Cannot Delete Department",

                text:
                    error.response?.data?.error ||
                    error.response?.data?.detail ||
                    "Unable to delete department.",

            });

        }

    };

    if (error) {

        return (

            <div className="error-state">

                <div className="error-icon">

                    <i className="fa-solid fa-triangle-exclamation"></i>

                </div>

                <h4>
                    Unable to Load Departments
                </h4>

                <p>
                    Something went wrong while loading the department data.
                </p>

                <button
                    className="btn btn-primary"
                    onClick={loadDepartments}
                >

                    <i className="fa-solid fa-rotate-right me-2"></i>

                    Try Again

                </button>

            </div>

        );

    }

    /* Loading */

    if (loading) {

        return (

            <div className="department-loading">

                <div
                    className="spinner-border text-primary"
                    role="status"
                >

                    <span className="visually-hidden">
                        Loading...
                    </span>

                </div>

                <span>
                    Loading departments...
                </span>

            </div>

        );

    }


    /* Empty */

    if (departments.length === 0) {

        return (

            <div className="department-empty-state">

                <div className="department-empty-icon">

                    <FontAwesomeIcon
                        icon={faBuilding}
                    />

                </div>

                <h4>
                    No Departments Found
                </h4>

                <p>
                    Try changing your search or create a new department.
                </p>

            </div>

        );

    }


    return (

        <>

            {/* ================================
                Desktop
            ================================= */}

            <div className="department-table-wrapper d-none d-lg-block">

                <table className="table department-table align-middle mb-0">

                    <thead>

                        <tr>

                            <th>
                                Department
                            </th>

                            <th>
                                Code
                            </th>

                            <th>
                                Description
                            </th>

                            <th>
                                Employees
                            </th>

                            <th>
                                Created
                            </th>

                            <th className="text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {departments.map((department) => (

                            <tr key={department.id}>


                                {/* Department */}

                                <td>

                                    <div className="department-info">

                                        <div className="department-icon">

                                            <FontAwesomeIcon
                                                icon={faBuilding}
                                            />

                                        </div>


                                        <div>

                                            <h6>

                                                {department.name}

                                            </h6>

                                            <small>
                                                Department
                                            </small>

                                        </div>

                                    </div>

                                </td>


                                {/* Code */}

                                <td>

                                    <span className="department-code">

                                        {department.department_code}

                                    </span>

                                </td>


                                {/* Description */}

                                <td>

                                    <div className="department-description">

                                        {department.description ||
                                            "No description provided."}

                                    </div>

                                </td>


                                {/* Employees */}

                                <td>

                                    <span className="employee-count">

                                        <FontAwesomeIcon
                                            icon={faUsers}
                                        />

                                        {department.employee_count}

                                    </span>

                                </td>


                                {/* Created */}

                                <td>

                                    <span className="department-date">

                                        {new Date(
                                            department.created_at
                                        ).toLocaleDateString(
                                            "en-IN",
                                            {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            }
                                        )}

                                    </span>

                                </td>


                                {/* Actions */}

                                <td>

                                    <div className="department-action-buttons">


                                        <Link
                                            to={`/departments/view/${department.id}`}
                                            className="department-action-btn view text-decoration-none"
                                            title="View Department"
                                        >

                                            <FontAwesomeIcon
                                                icon={faEye}
                                            />

                                        </Link>


                                        <Link
                                            to={`/departments/edit/${department.id}`}
                                            className="department-action-btn edit"
                                            title="Edit Department"
                                        >

                                            <FontAwesomeIcon
                                                icon={faPen}
                                            />

                                        </Link>


                                        <button
                                            className="department-action-btn delete"
                                            onClick={() =>
                                                handleDelete(
                                                    department.id
                                                )
                                            }
                                            title="Delete Department"
                                        >

                                            <FontAwesomeIcon
                                                icon={faTrash}
                                            />

                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>


            {/* ================================
                Mobile
            ================================= */}

            <div className="d-lg-none">

                {departments.map((department) => (

                    <div
                        className="department-card"
                        key={department.id}
                    >


                        <div className="department-card-header">

                            <div className="department-icon">

                                <FontAwesomeIcon
                                    icon={faBuilding}
                                />

                            </div>


                            <div>

                                <h5>
                                    {department.name}
                                </h5>

                                <span>

                                    {department.department_code}

                                </span>

                            </div>

                        </div>


                        <p className="department-card-description">

                            {department.description ||
                                "No description provided."}

                        </p>


                        <div className="department-card-meta">

                            <span>

                                <FontAwesomeIcon
                                    icon={faUsers}
                                />

                                {department.employee_count}
                                {" "}
                                Employees

                            </span>


                            <span>

                                {new Date(
                                    department.created_at
                                ).toLocaleDateString(
                                    "en-IN",
                                    {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    }
                                )}

                            </span>

                        </div>


                        <div className="department-card-actions">


                            <Link
                                to={`/departments/view/${department.id}`}
                                className="department-action-btn view text-decoration-none"
                            >

                                <FontAwesomeIcon
                                    icon={faEye}
                                />

                                <span>
                                    View
                                </span>

                            </Link>


                            <Link
                                to={`/departments/edit/${department.id}`}
                                className="department-action-btn edit text-decoration-none"
                            >

                                <FontAwesomeIcon
                                    icon={faPen}
                                />

                                <span>
                                    Edit
                                </span>

                            </Link>


                            <button
                                className="department-action-btn delete"
                                onClick={() =>
                                    handleDelete(
                                        department.id
                                    )
                                }
                            >

                                <FontAwesomeIcon
                                    icon={faTrash}
                                />

                                <span>
                                    Delete
                                </span>

                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </>

    );

}


export default DepartmentTable;