import "./EmployeeCard.css";

import { Link } from "react-router-dom";

function EmployeeCard({ employee, handleDelete }) {

    return (

        <div className="employee-card">

            <div className="employee-card-header">

                <img
                    src={employee.profile_photo}
                    alt={employee.full_name}
                    className="employee-card-avatar"
                />

                <div>

                    <h5>{employee.full_name}</h5>

                    <small>

                        ID : {employee.employee_id}

                    </small>

                </div>

            </div>

            <div className="employee-card-body">

                <p>

                    <strong>📧 Email</strong>

                    <br />

                    {employee.email}

                </p>

                <p>

                    <strong>📱 Phone</strong>

                    <br />

                    {employee.phone}

                </p>

                <p>

                    <strong>💼 Designation</strong>

                    <br />

                    {employee.designation}

                </p>

                <p>

                    <strong>🏢 Department</strong>

                    <br />

                    {employee.department_name}

                </p>

                <p>

                    <strong>💰 Salary</strong>

                    <br />

                    ₹ {Number(employee.salary).toLocaleString("en-IN")}

                </p>

                <p>

                    <strong>Status</strong>

                    <br />

                    <span
                        className={`status-badge ${
                            employee.is_active
                                ? "active"
                                : "inactive"
                        }`}
                    >

                        {employee.is_active ? "🟢 Active" : "🔴 Inactive"}

                    </span>

                </p>

            </div>

            <div className="employee-card-footer">

                <Link
                    to={`/employees/view/${employee.id}`}
                    className="btn btn-outline-info"
                >

                    👁

                </Link>

                <Link
                    to={`/employees/edit/${employee.id}`}
                    className="btn btn-outline-warning"
                >

                    ✏️

                </Link>

                <button
                    className="btn btn-outline-danger"
                    onClick={() => handleDelete(employee.id)}
                >

                    🗑

                </button>

            </div>

        </div>

    );

}

export default EmployeeCard;