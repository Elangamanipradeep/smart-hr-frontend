import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import EmployeeTable from "../../components/EmployeeTable/EmployeeTable";
import { getEmployees } from "../../services/employeeService";
import { getDepartments } from "../../services/departmentService";
import { useNavigate } from "react-router-dom";

function EmployeeList() {

    const [employees, setEmployees] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [pagination, setPagination] = useState({});
    const [search, setSearch] = useState("");
    const [departments, setDepartments] = useState([]);
    const [department, setDepartment] = useState("");
    const [status, setStatus] = useState("");
    const [ordering, setOrdering] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

          loadDepartments();

      }, []);

    useEffect(() => {
        loadEmployees();
    }, [page, pageSize, search, department, status, ordering]); 

    const loadEmployees = async () => {

        try {

            const response = await getEmployees(page, pageSize, search, department, status, ordering);

            setEmployees(response.results);
            setPagination(response);

        }

        catch (error) {

            console.log(error);

        }

    };

    const loadDepartments = async () => {

        try {

            const response = await getDepartments();

            setDepartments(response.results);

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <DashboardLayout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>

                    Employees

                </h2>

                <button className="btn btn-primary" onClick={() => navigate("/employees/create")}>

                    + Add Employee

                </button>

            </div>

            <div className="row mb-4">

                <div className="col-md-4">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search employee..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                <div className="col-md-3">

                    <select
                className="form-select h-100"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
            >

                <option value="">
                    All Departments
                </option>

                {departments.map((dept) => (

                    <option
                        key={dept.id}
                        value={dept.id}
                    >
                        {dept.name}
                    </option>

                ))}

            </select>

                </div>

                <div className="col-md-3">

                    <select
                        className="form-select h-100"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >

                        <option value="">
                            All Status
                        </option>

                        <option value="true">
                            Active
                        </option>

                        <option value="false">
                            Inactive
                        </option>

                    </select>

                </div>

                <div className="col-md-2">

                    <select
                        className="form-select h-100"
                        value={ordering}
                        onChange={(e) => setOrdering(e.target.value)}
                    >

                        <option value="">
                            Sort By
                        </option>

                        <option value="full_name">
                            Name (A-Z)
                        </option>

                        <option value="-full_name">
                            Name (Z-A)
                        </option>

                        <option value="salary">
                            Salary (Low-High)
                        </option>

                        <option value="-salary">
                            Salary (High-Low)
                        </option>

                        <option value="joining_date">
                            Oldest Joining
                        </option>

                        <option value="-joining_date">
                            Newest Joining
                        </option>

                    </select>

                </div>

            </div>
            

            <EmployeeTable employees={employees}  loadEmployees={loadEmployees} />

            <div className="d-flex justify-content-between align-items-center mt-4">

                <button
                    className="btn btn-outline-primary h-auto"
                    disabled={!pagination.previous}
                    onClick={() => setPage(page - 1)}
                >
                    Previous
                </button>

                <span>
                    Page {page}
                </span>
                <div className="col-md-2">

                    <select
                        className="form-select"
                        value={pageSize}
                        onChange={(e) => {

                            setPage(1);

                            setPageSize(e.target.value);

                        }}>

                        <option value="5">5</option>

                        <option value="10">10</option>

                        <option value="20">20</option>

                        <option value="50">50</option>

                    </select>

                </div>

                <button
                    className="btn btn-outline-primary h-auto"
                    disabled={!pagination.next}
                    onClick={() => setPage(page + 1)}>
                    Next
                </button>

            </div>

        </DashboardLayout>

    );

}

export default EmployeeList;