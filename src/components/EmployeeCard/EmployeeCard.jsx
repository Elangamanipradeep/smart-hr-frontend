import "./EmployeeCard.css";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faEye,
    faPen,
    faTrash,
    faEnvelope,
    faPhone,
    faBriefcase,
    faBuilding,
    faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

import defaultProfile from "../../assets/default-profile.png";


function EmployeeCard({ employee, handleDelete, role }) {

    return (

        <div className="employee-card">

            {/* Header */}

            <div className="employee-card-header">

                <img
                    src={employee.profile_photo || defaultProfile}
                    alt={employee.full_name}
                    className="employee-card-avatar"
                />

                <div className="employee-card-identity">

                    <h5>
                        {employee.full_name}
                    </h5>

                    <span>
                        ID : {employee.employee_id}
                    </span>

                    <span
                        className={`employee-card-status ${
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

                </div>

            </div>


            {/* Details */}

            <div className="employee-card-details">


                <div className="employee-card-detail">

                    <FontAwesomeIcon icon={faEnvelope} />

                    <div>

                        <span>
                            Email
                        </span>

                        <strong>
                            {employee.email}
                        </strong>

                    </div>

                </div>


                <div className="employee-card-detail">

                    <FontAwesomeIcon icon={faPhone} />

                    <div>

                        <span>
                            Phone
                        </span>

                        <strong>
                            {employee.phone}
                        </strong>

                    </div>

                </div>


                <div className="employee-card-detail">

                    <FontAwesomeIcon icon={faBriefcase} />

                    <div>

                        <span>
                            Designation
                        </span>

                        <strong>
                            {employee.designation}
                        </strong>

                    </div>

                </div>


                <div className="employee-card-detail">

                    <FontAwesomeIcon icon={faBuilding} />

                    <div>

                        <span>
                            Department
                        </span>

                        <strong>
                            {employee.department_name}
                        </strong>

                    </div>

                </div>


                <div className="employee-card-detail">

                    <FontAwesomeIcon icon={faMoneyBill} />

                    <div>

                        <span>
                            Salary
                        </span>

                        <strong>
                            ₹ {Number(employee.salary).toLocaleString("en-IN")}
                        </strong>

                    </div>

                </div>

            </div>


            {/* Actions */}

            <div className="employee-card-footer">

                <Link
                    to={`/employees/view/${employee.id}`}
                    className="employee-card-action view"
                    title="View Employee"
                >

                    <FontAwesomeIcon icon={faEye} />

                    <span>
                        View
                    </span>

                </Link>


                <Link
                    to={`/employees/edit/${employee.id}`}
                    className="employee-card-action edit"
                    title="Edit Employee"
                >

                    <FontAwesomeIcon icon={faPen} />

                    <span>
                        Edit
                    </span>

                </Link>

                {role === "Admin" && (
                    <button
                        className="employee-card-action delete"
                        onClick={() => handleDelete(employee.id)}
                        title="Delete Employee"
                    >

                        <FontAwesomeIcon icon={faTrash} />

                        <span>
                            Delete
                        </span>

                    </button>

                )}
            </div>

        </div>

    );

}

export default EmployeeCard;