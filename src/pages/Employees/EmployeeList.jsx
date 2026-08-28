import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import EmployeeTable from "../../components/EmployeeTable/EmployeeTable";
import { getEmployees } from "../../services/employeeService";
import { getDepartments } from "../../services/departmentService";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faPlus,
    faMagnifyingGlass,
    faFilter,
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import "./EmployeeList.css";


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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {

          loadDepartments();

      }, []);

    useEffect(() => {
        loadEmployees();
    }, [page, pageSize, search, department, status, ordering]); 

    const loadEmployees = async () => {

        setLoading(true);
        setError(false);

        try {

            const response = await getEmployees(
                page,
                pageSize,
                search,
                department,
                status,
                ordering
            );

            setEmployees(response.results);
            setPagination(response);

        }

        catch (error) {

            console.log(error);

            setError(true);

        }

        finally {

            setLoading(false);

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

            <div className="employee-page-header justify-content-end">

                


                <button
                    className="add-employee-btn"
                    onClick={() => navigate("/employees/create")}
                >

                    <FontAwesomeIcon icon={faPlus} />

                    <span>
                        Add Employee
                    </span>

                </button>

            </div>

            <div className="employee-filter-panel">

                <div className="employee-filter-header">

                    <div className="filter-title">

                        <FontAwesomeIcon icon={faFilter} />

                        <span>
                            Filters
                        </span>

                    </div>

                </div>


                <div className="employee-filters">


                    {/* Search */}

                    <div className="employee-search">

                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className="search-icon"
                        />

                        <input
                            type="text"
                            placeholder="Search employee..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                        />

                    </div>


                    {/* Department */}

                    <select
                        className="employee-filter-select"
                        value={department}
                        onChange={(e) => {

                            setDepartment(e.target.value);

                            setPage(1);

                        }}
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


                    {/* Status */}

                    <select
                        className="employee-filter-select"
                        value={status}
                        onChange={(e) => {

                            setStatus(e.target.value);

                            setPage(1);

                        }}
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


                    {/* Ordering */}

                    <select
                        className="employee-filter-select"
                        value={ordering}
                        onChange={(e) => {

                            setOrdering(e.target.value);

                            setPage(1);

                        }}
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


                    {/* Page size */}

                    <select
                        className="employee-filter-select page-size-select"
                        value={pageSize}
                        onChange={(e) => {

                            setPageSize(Number(e.target.value));

                            setPage(1);

                        }}
                    >

                        <option value="5">
                            5 Rows
                        </option>

                        <option value="10">
                            10 Rows
                        </option>

                        <option value="20">
                            20 Rows
                        </option>

                    </select>

                </div>

            </div>
            

            <EmployeeTable employees={employees}  loadEmployees={loadEmployees} loading={loading} error={error} />

            <div className="employee-pagination">

    <div className="employee-pagination-info">

        Showing

        <strong>
            {" "}
            {employees.length}
            {" "}
        </strong>

        of

        <strong>
            {" "}
            {pagination.count || 0}
            {" "}
        </strong>

        employees

    </div>


    <div className="employee-pagination-controls">

        <button
            className="pagination-btn"
            disabled={!pagination.previous}
            onClick={() => setPage(page - 1)}
            title="Previous page"
        >

            <FontAwesomeIcon
                icon={faChevronLeft}
            />

            <span>
                Previous
            </span>

        </button>


        <span className="pagination-page">

            Page {page}

        </span>


        <button
            className="pagination-btn"
            disabled={!pagination.next}
            onClick={() => setPage(page + 1)}
            title="Next page"
        >

            <span>
                Next
            </span>

            <FontAwesomeIcon
                icon={faChevronRight}
            />

        </button>

    </div>

</div>

        </DashboardLayout>

    );

}

export default EmployeeList;