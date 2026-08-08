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

    <div>

        <h2 className="fw-bold mb-1">

            Employees

        </h2>

        <p className="text-muted mb-0">

            Manage all employees in your organization.

        </p>

    </div>

    <button
        className="btn btn-primary px-4 py-3"
        onClick={() => navigate("/employees/create")}
    >

        + Add Employee

    </button>

</div>

<div className="card border-0 shadow-sm rounded-4 mb-4">

    <div className="card-body">

        <div className="row g-3">

            <div className="col-xl-4 col-lg-6 col-md-12">

                <input
                    type="text"
                    className="form-control"
                    placeholder="🔍 Search employee..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            <div className="col-xl-2 col-lg-6 col-md-6">

                <select
                    className="form-select"
                    value={department}
                    onChange={(e)=>setDepartment(e.target.value)}
                >

                    <option value="">

                        All Departments

                    </option>

                    {departments.map((dept)=>(
                        <option
                            key={dept.id}
                            value={dept.id}
                        >
                            {dept.name}
                        </option>
                    ))}

                </select>

            </div>

            <div className="col-xl-2 col-lg-6 col-md-6">

                <select
                    className="form-select"
                    value={status}
                    onChange={(e)=>setStatus(e.target.value)}
                >

                    <option value="">All Status</option>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>

                </select>

            </div>

            <div className="col-xl-2 col-lg-6 col-md-6">

                <select
                    className="form-select"
                    value={ordering}
                    onChange={(e)=>setOrdering(e.target.value)}
                >

                    <option value="-joining_date">

                        Newest Joined

                    </option>

                    <option value="joining_date">

                        Oldest Joined

                    </option>

                    <option value="salary">

                        Salary Low → High

                    </option>

                    <option value="-salary">

                        Salary High → Low

                    </option>

                </select>

            </div>

            <div className="col-xl-2 col-lg-6 col-md-6">

                <select
                    className="form-select"
                    value={pageSize}
                    onChange={(e)=>{

                        setPageSize(e.target.value);

                        setPage(1);

                    }}
                >

                    <option value="5">5 Rows</option>
                    <option value="10">10 Rows</option>
                    <option value="20">20 Rows</option>

                </select>

            </div>

        </div>

    </div>

</div>
            

            <EmployeeTable employees={employees}  loadEmployees={loadEmployees} />

            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

                <div className="text-muted">

                    Showing

                    <strong>

                        {" "}
                        {employees.length}
                        {" "}

                    </strong>

                    of

                    <strong>

                        {" "}
                        {pagination.count}
                        {" "}

                    </strong>

                    employees

                </div>

                <div className="d-flex align-items-center gap-3">

                    <button
                        className="btn btn-outline-primary"
                        disabled={!pagination.previous}
                        onClick={() => setPage(page - 1)}
                    >

                        Previous

                    </button>

                    <span className="fw-semibold">

                        Page {page}

                    </span>

                    <button
                        className="btn btn-outline-primary"
                        disabled={!pagination.next}
                        onClick={() => setPage(page + 1)}
                    >

                        Next

                    </button>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default EmployeeList;