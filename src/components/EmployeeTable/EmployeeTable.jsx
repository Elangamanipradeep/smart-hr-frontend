import "./EmployeeTable.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteEmployee } from "../../services/employeeService";

function EmployeeTable({ employees, loadEmployees }) {

    const navigate = useNavigate();
    const handleDelete = async (id) => {

        const result = await Swal.fire({

            title: "Delete Employee?",

            text: "This employee will be removed from the list.",

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

    return (

        <div className="table-responsive">

            <table className="table table-hover align-middle">

                <thead>

                    <tr>

                        <th>Photo</th>

                        <th>Employee ID</th>

                        <th>Name</th>

                        <th>Email</th>

                        <th>Department</th>

                        <th>Designation</th>

                        <th>Salary</th>

                        <th>Status</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {employees.map((employee) => (

                        <tr key={employee.id}>

                            <td>

                                <img
                                    src={employee.profile_photo}
                                    alt={employee.full_name}
                                    className="employee-photo"
                                />

                            </td>

                            <td>{employee.employee_id}</td>

                            <td>{employee.full_name}</td>

                            <td>{employee.email}</td>

                            <td>{employee.department_name}</td>

                            <td>{employee.designation}</td>

                            <td>₹ {employee.salary}</td>

                            <td>

                                {employee.is_active ? (

                                    <span className="badge bg-success">

                                        Active

                                    </span>

                                ) : (

                                    <span className="badge bg-danger">

                                        Inactive

                                    </span>

                                )}

                            </td>
                            <td className="">

                                <button
                                    className="btn btn-warning btn-sm h-auto px-3"
                                    onClick={() => navigate(`/employees/edit/${employee.id}`)}
                                >

                                    Edit

                                </button>

                                <button className="btn btn-danger btn-sm h-auto px-3 ms-2"
                                    onClick={() => handleDelete(employee.id)}
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default EmployeeTable;