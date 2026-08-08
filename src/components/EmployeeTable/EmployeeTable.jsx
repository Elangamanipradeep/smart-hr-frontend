import "./EmployeeTable.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteEmployee } from "../../services/employeeService";
import EmployeeCard from "../EmployeeCard/EmployeeCard";

function EmployeeTable({ employees, loadEmployees }) {

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

                                                src={employee.profile_photo}

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

                                        <div>

                                            <div>

                                                📧 {employee.email}

                                            </div>

                                            <small className="text-muted">

                                                📱 {employee.phone}

                                            </small>

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

                                            {employee.is_active ? "🟢 Active" : "🔴 Inactive"}

                                        </span>

                                    </td>

                                    <td>

                                        <div className="action-buttons">

                                            <Link
                                                to={`/employees/view/${employee.id}`}
                                                className="btn btn-outline-info btn-sm"
                                                title="View"
                                            >
                                                👁
                                            </Link>

                                            <Link
                                                to={`/employees/edit/${employee.id}`}
                                                className="btn btn-outline-warning btn-sm"
                                                title="Edit"
                                            >
                                                ✏️
                                            </Link>

                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                title="Delete"
                                                onClick={() => handleDelete(employee.id)}
                                            >
                                                🗑
                                            </button>

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