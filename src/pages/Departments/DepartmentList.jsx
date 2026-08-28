import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import DepartmentTable from "../../components/DepartmentTable/DepartmentTable";

import { getDepartments } from "../../services/departmentService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faPlus,
    faFilter,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";


function DepartmentList() {

    const navigate = useNavigate();

    const [departments, setDepartments] = useState([]);

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);

    const [pageSize, setPageSize] = useState(5);

    const [pagination, setPagination] = useState({});

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(false);

    useEffect(() => {

        loadDepartments();

    }, [page, pageSize, search]);


    const loadDepartments = async () => {

        setLoading(true);
        setError(false);

        try {

            const response = await getDepartments(
                page,
                pageSize,
                search
            );

            if (
                page > 1 &&
                response.results.length === 0
            ) {

                setPage(page - 1);

                return;

            }

            setDepartments(response.results);
            setPagination(response);

        }

        catch (error) {

            if (
                page > 1 &&
                error.response?.status === 404
            ) {

                setPage(page - 1);

                return;

            }

            console.log(error);

            setError(true);

        }

        finally {

            setLoading(false);

        }

    };


    return (

        <DashboardLayout>


            {/* Page Header */}

            <div className="d-flex justify-content-end align-items-center mb-4">

                {/* <div>

                    <h2 className="fw-bold mb-1">

                        Departments

                    </h2>

                    <p className="text-muted mb-0">

                        Manage all departments in your organization.

                    </p>

                </div> */}


                <button
                    className="btn btn-primary department-add-btn"
                    onClick={() =>
                        navigate("/departments/create")
                    }
                >

                    <FontAwesomeIcon icon={faPlus} />

                    <span>Add Department</span>

                </button>

            </div>


            {/* Filters */}

            <div className="department-filter-card">

                <div className="department-filter-header">

                    <FontAwesomeIcon icon={faFilter} />

                    <span>Filters</span>

                </div>


                <div className="department-filter-body">

                    <div className="department-search">

                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                        />

                        <input
                            type="text"
                            placeholder="Search department..."
                            value={search}
                            onChange={(e) => {

                                setSearch(e.target.value);

                                setPage(1);

                            }}
                        />

                    </div>


                    <select
                        className="department-page-size"
                        value={pageSize}
                        onChange={(e) => {

                            setPageSize(
                                Number(e.target.value)
                            );

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


            {/* Department Table */}

            <DepartmentTable
                departments={departments}
                loadDepartments={loadDepartments}
                loading={loading} 
                error={error}
            />


            {/* Pagination */}

            {!loading && departments.length > 0 && (

                <div className="department-pagination">

                    <div className="department-result-count">

                        Showing

                        <strong>
                            {" "}
                            {departments.length}
                            {" "}
                        </strong>

                        of

                        <strong>
                            {" "}
                            {pagination.count || 0}
                            {" "}
                        </strong>

                        departments

                    </div>


                    <div className="department-page-controls">

                        <button
                            className="btn btn-outline-primary"
                            disabled={!pagination.previous}
                            onClick={() =>
                                setPage(page - 1)
                            }
                        >

                            Previous

                        </button>


                        <span>

                            Page {page}

                        </span>


                        <button
                            className="btn btn-outline-primary"
                            disabled={!pagination.next}
                            onClick={() =>
                                setPage(page + 1)
                            }
                        >

                            Next

                        </button>

                    </div>

                </div>

            )}

        </DashboardLayout>

    );

}


export default DepartmentList;