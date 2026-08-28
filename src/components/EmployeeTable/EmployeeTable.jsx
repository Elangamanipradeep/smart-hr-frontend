import "./EmployeeTable.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteEmployee } from "../../services/employeeService";
import EmployeeCard from "../EmployeeCard/EmployeeCard";

import defaultProfile from "../../assets/default-profile.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faEye,
    faPen,
    faTrash,
    faEnvelope,
    faPhone,
    faSpinner,
} from "@fortawesome/free-solid-svg-icons";

function EmployeeTable({ employees, loadEmployees, loading, error }) {

    const role = localStorage.getItem("role");

    const handleDelete = async (id) => {

        const result = await Swal.fire({

            title: "Delete Employee?",

            text: "This employee will be removed permanently.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: "#dc3545",

            confirmButtonText: "Delete",

        });

        if (!result.isConfirmed) return;

        try {

            await deleteEmployee(id);

            Swal.fire({

                icon: "success",

                title: "Deleted",

                text: "Employee deleted successfully.",

                timer: 1500,

                showConfirmButton: false,

            });

            loadEmployees();

        }

        catch (error) {

            Swal.fire({

                icon: "error",

                title: "Failed",

                text: "Unable to delete employee.",

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
                    Unable to Load Employees
                </h4>

                <p>
                    Something went wrong while loading the employee data.
                </p>

                <button
                    className="btn btn-primary"
                    onClick={loadEmployees}
                >

                    <i className="fa-solid fa-rotate-right me-2"></i>

                    Try Again

                </button>

            </div>

        );

    }

    if (loading) {

        return (

            <div className="employee-loading">

                <FontAwesomeIcon
                    icon={faSpinner}
                    spin
                />

                <span>
                    Loading employees...
                </span>

            </div>

        );

    }

    if (employees.length === 0) {

        return (

            <div className="empty-state">

                <div className="empty-icon">

                    📂

                </div>

                <h4>No Employees Found</h4>

                <p>

                    Try changing your filters or create a new employee.

                </p>

            </div>

        );

    }


    return (

    <>

        <div className="d-none d-lg-block mb-3"> 
            <div className="employee-table-wrapper">

                <table className="table employee-table align-middle mb-0">

                    <thead>

                        <tr>

                            <th>Employee</th>

                            <th>Contact</th>

                            <th>Job Details</th>

                            <th>Salary</th>

                            <th>Status</th>

                            <th className="text-center">

                                Actions

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            employees.map((employee) => (

                                <tr key={employee.id}>

                                    <td>

                                        <div className="employee-info">

                                            <img

                                                src={employee.profile_photo || defaultProfile}

                                                alt={employee.full_name}

                                                className="employee-avatar"

                                            />

                                            <div>

                                                <h6 className="mb-1">

                                                    {employee.full_name}

                                                </h6>

                                                <small className="text-muted">

                                                    ID : {employee.employee_id}

                                                </small>

                                            </div>

                                        </div>

                                    </td>

                                    <td>

                                        <div className="employee-contact">

                                            <div className="contact-item">

                                                <FontAwesomeIcon icon={faEnvelope} />

                                                <span>
                                                    {employee.email}
                                                </span>

                                            </div>

                                            <div className="contact-item">

                                                <FontAwesomeIcon icon={faPhone} />

                                                <span>
                                                    {employee.phone}
                                                </span>

                                            </div>

                                        </div>

                                    </td>

                                    <td>

                                        <div>

                                            <strong>

                                                {employee.designation}

                                            </strong>

                                            <br />

                                            <small className="text-muted">

                                                {employee.department_name}

                                            </small>

                                        </div>

                                    </td>

                                    <td>

                                        <div className="salary">

                                            ₹ {Number(employee.salary).toLocaleString("en-IN")}

                                            <small>

                                                Per Month

                                            </small>

                                        </div>

                                    </td>

                                    <td>

                                        <span
                                            className={`status-badge ${
                                                employee.is_active
                                                    ? "active"
                                                    : "inactive"
                                            }`}
                                        >

                                            <span className="status-dot"></span>

                                            {employee.is_active
                                                ? "Active"
                                                : "Inactive"}

                                        </span>

                                    </td>

                                    <td>

                                        <div className="action-buttons">

                                            <Link
                                                to={`/employees/view/${employee.id}`}
                                                className="btn btn-outline-info btn-sm"
                                                title="View"
                                            >
                                                <FontAwesomeIcon icon={faEye} />
                                            </Link>

                                            <Link
                                                to={`/employees/edit/${employee.id}`}
                                                className="btn btn-outline-warning btn-sm"
                                                title="Edit"
                                            >
                                                <FontAwesomeIcon icon={faPen} />
                                            </Link>


                                            {role === "Admin" && (
                                                <button
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={() => handleDelete(employee.id)}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            )}

                                        </div>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>
        </div>


        <div className="d-lg-none">

            {employees.map((employee) => (

                <EmployeeCard
                    key={employee.id}
                    employee={employee}
                    handleDelete={handleDelete}
                />

            ))}

        </div>

    </>

);

}

export default EmployeeTable;