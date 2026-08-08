import "./EmployeeDetails.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getEmployee } from "../../services/employeeService";

function EmployeeDetailsComponent() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [employee, setEmployee] = useState(null);

    useEffect(() => {

        loadEmployee();

    }, []);

    const loadEmployee = async () => {

        try {

            const response = await getEmployee(id);

            setEmployee(response);

        }

        catch (error) {

            console.log(error);

        }

    };

    if (!employee) {

        return <h5>Loading...</h5>;

    }

    return (

        <div className="employee-details-card">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2>

                        Employee Details

                    </h2>

                    <p className="text-muted">

                        Employee profile information

                    </p>

                </div>

                <div>

                    <button
                        className="btn btn-outline-secondary me-2"
                        onClick={() => navigate("/employees")}
                    >

                        Back

                    </button>

                    <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/employees/edit/${employee.id}`)}
                    >

                        Edit

                    </button>

                </div>

            </div>

            <div className="row">

                <div className="col-lg-4">

                    <div className="profile-card">

                        <img

                            src={employee.profile_photo}

                            alt={employee.full_name}

                            className="profile-image"

                        />

                        <h4 className="mt-3">

                            {employee.full_name}

                        </h4>

                        <p className="text-muted">

                            {employee.designation}

                        </p>

                    </div>

                </div>

                <div className="col-lg-8">

                    <table className="table">

                        <tbody>

                            <tr>
                                <th>Employee ID</th>
                                <td>{employee.employee_id}</td>
                            </tr>

                            <tr>
                                <th>Email</th>
                                <td>{employee.email}</td>
                            </tr>

                            <tr>
                                <th>Phone</th>
                                <td>{employee.phone}</td>
                            </tr>

                            <tr>
                                <th>Department</th>
                                <td>{employee.department_name}</td>
                            </tr>

                            <tr>
                                <th>Salary</th>
                                <td>₹ {employee.salary}</td>
                            </tr>

                            <tr>
                                <th>Joining Date</th>
                                <td>{employee.joining_date}</td>
                            </tr>

                            <tr>
                                <th>Status</th>

                                <td>

                                    <span
                                        className={
                                            employee.is_active
                                                ? "badge bg-success"
                                                : "badge bg-danger"
                                        }
                                    >

                                        {
                                            employee.is_active
                                                ? "Active"
                                                : "Inactive"
                                        }

                                    </span>

                                </td>

                            </tr>

                            <tr>
                                <th>Created At</th>
                                <td>{employee.created_at}</td>
                            </tr>

                            <tr>
                                <th>Updated At</th>
                                <td>{employee.updated_at}</td>
                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default EmployeeDetailsComponent;