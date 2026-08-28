import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import { getUsers, toggleHRStatus } from "../../services/userService";

import Swal from "sweetalert2";
import { toast } from "react-toastify";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faUser,
    faUserPlus,
    faPen,
    faUserSlash,
    faUserCheck,
    faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

import "./UserList.css";


function UserList() {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        loadUsers();

    }, []);


    const loadUsers = async () => {

        setLoading(true);

        try {

            const response = await getUsers();

            setUsers(response);

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to load HR users.");

        }

        finally {

            setLoading(false);

        }

    };


    const handleStatus = async (user) => {

        const result = await Swal.fire({

            title: user.is_active
                ? "Deactivate HR?"
                : "Activate HR?",

            text: user.is_active
                ? "The HR user will no longer be able to login."
                : "The HR user will be able to login again.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: user.is_active
                ? "#dc3545"
                : "#198754",

            cancelButtonColor: "#6c757d",

            confirmButtonText: user.is_active
                ? "Yes, Deactivate"
                : "Yes, Activate",

        });


        if (!result.isConfirmed) return;


        try {

            const response = await toggleHRStatus(user.id);

            toast.success(response.message);

            loadUsers();

        }

        catch (error) {

            toast.error(
                error.response?.data?.detail ||
                "Something went wrong."
            );

        }

    };


    return (

        <DashboardLayout>


            {/* Page Header */}

            <div className="user-page-header">

                <div>

                    <h2>
                        HR Users
                    </h2>

                    <p>
                        Manage HR user accounts and access.
                    </p>

                </div>


                <Link
                    to="/users/create"
                    className="user-add-btn"
                >

                    <FontAwesomeIcon
                        icon={faUserPlus}
                    />

                    <span>
                        Add HR
                    </span>

                </Link>

            </div>


            {/* Users Card */}

            <div className="user-table-card">


                {/* Table */}

                {loading ? (

                    <div className="user-loading">

                        <div
                            className="spinner-border text-primary"
                            role="status"
                        >

                            <span className="visually-hidden">
                                Loading...
                            </span>

                        </div>

                        <span>
                            Loading HR users...
                        </span>

                    </div>

                ) : users.length === 0 ? (

                    <div className="user-empty-state">

                        <div className="user-empty-icon">

                            <FontAwesomeIcon
                                icon={faUser}
                            />

                        </div>

                        <h4>
                            No HR Users Found
                        </h4>

                        <p>
                            Create an HR user to manage your organization.
                        </p>

                    </div>

                ) : (

                    <div className="table-responsive">

                        <table className="table user-table align-middle mb-0">

                            <thead>

                                <tr>

                                    <th>
                                        User
                                    </th>

                                    <th>
                                        Name
                                    </th>

                                    <th>
                                        Email
                                    </th>

                                    <th>
                                        Role
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th className="text-center">
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {users.map((user) => (

                                    <tr key={user.id}>


                                        {/* User */}

                                        <td>

                                            <div className="user-info">

                                                <div className="user-avatar">

                                                    <FontAwesomeIcon
                                                        icon={faUser}
                                                    />

                                                </div>

                                                <div>

                                                    <h6>
                                                        {user.username}
                                                    </h6>

                                                    <small>
                                                        User Account
                                                    </small>

                                                </div>

                                            </div>

                                        </td>


                                        {/* Name */}

                                        <td>

                                            <span className="user-name">

                                                {user.first_name}{" "}
                                                {user.last_name}

                                            </span>

                                        </td>


                                        {/* Email */}

                                        <td>

                                            <div className="user-email">

                                                <FontAwesomeIcon
                                                    icon={faEnvelope}
                                                />

                                                <span>
                                                    {user.email}
                                                </span>

                                            </div>

                                        </td>


                                        {/* Role */}

                                        <td>

                                            <span className="role-badge">

                                                {user.role}

                                            </span>

                                        </td>


                                        {/* Status */}

                                        <td>

                                            <span
                                                className={`user-status ${
                                                    user.is_active
                                                        ? "active"
                                                        : "inactive"
                                                }`}
                                            >

                                                <span className="status-dot"></span>

                                                {user.is_active
                                                    ? "Active"
                                                    : "Inactive"
                                                }

                                            </span>

                                        </td>


                                        {/* Actions */}

                                        <td>

                                            <div className="user-actions">


                                                <Link
                                                    to={`/users/${user.id}/edit`}
                                                    className="user-action-btn edit"
                                                    title="Edit HR"
                                                >

                                                    <FontAwesomeIcon
                                                        icon={faPen}
                                                    />

                                                </Link>


                                                <button
                                                    className={`user-action-btn ${
                                                        user.is_active
                                                            ? "deactivate"
                                                            : "activate"
                                                    }`}
                                                    onClick={() =>
                                                        handleStatus(user)
                                                    }
                                                    title={
                                                        user.is_active
                                                            ? "Deactivate HR"
                                                            : "Activate HR"
                                                    }
                                                >

                                                    <FontAwesomeIcon
                                                        icon={
                                                            user.is_active
                                                                ? faUserSlash
                                                                : faUserCheck
                                                        }
                                                    />

                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>


            {/* Mobile Cards */}

            {!loading && users.length > 0 && (

                <div className="user-mobile-list">

                    {users.map((user) => (

                        <div
                            className="user-mobile-card"
                            key={user.id}
                        >

                            <div className="user-mobile-header">

                                <div className="user-avatar">

                                    <FontAwesomeIcon
                                        icon={faUser}
                                    />

                                </div>

                                <div>

                                    <h5>
                                        {user.first_name}{" "}
                                        {user.last_name}
                                    </h5>

                                    <small>
                                        @{user.username}
                                    </small>

                                </div>

                            </div>


                            <div className="user-mobile-details">

                                <div>

                                    <span>
                                        Email
                                    </span>

                                    <strong>
                                        {user.email}
                                    </strong>

                                </div>


                                <div>

                                    <span>
                                        Role
                                    </span>

                                    <strong>
                                        {user.role}
                                    </strong>

                                </div>


                                <div>

                                    <span>
                                        Status
                                    </span>

                                    <span
                                        className={`user-status ${
                                            user.is_active
                                                ? "active"
                                                : "inactive"
                                        }`}
                                    >

                                        <span className="status-dot"></span>

                                        {user.is_active
                                            ? "Active"
                                            : "Inactive"
                                        }

                                    </span>

                                </div>

                            </div>


                            <div className="user-mobile-actions">

                                <Link
                                    to={`/users/${user.id}/edit`}
                                    className="user-mobile-btn edit"
                                >

                                    <FontAwesomeIcon
                                        icon={faPen}
                                    />

                                    Edit

                                </Link>


                                <button
                                    className={`user-mobile-btn ${
                                        user.is_active
                                            ? "deactivate"
                                            : "activate"
                                    }`}
                                    onClick={() =>
                                        handleStatus(user)
                                    }
                                >

                                    <FontAwesomeIcon
                                        icon={
                                            user.is_active
                                                ? faUserSlash
                                                : faUserCheck
                                        }
                                    />

                                    {user.is_active
                                        ? "Deactivate"
                                        : "Activate"
                                    }

                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </DashboardLayout>

    );

}


export default UserList;