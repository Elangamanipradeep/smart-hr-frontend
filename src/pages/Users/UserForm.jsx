import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
    createUser,
    getUser,
    updateUser,
} from "../../services/userService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faEye,
    faEyeSlash,
    faArrowLeft,
    faUserShield,
    faUser,
    faEnvelope,
    faLock,
    faSave,
    faRotate,
    faToggleOn,
} from "@fortawesome/free-solid-svg-icons";

import "./UserForm.css";


function UserForm() {

    const navigate = useNavigate();

    const { id } = useParams();

    const isEdit = Boolean(id);

    const [errors, setErrors] = useState({});

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({

        username: "",

        first_name: "",

        last_name: "",

        email: "",

        password: "",

        is_active: true,

    });


    useEffect(() => {

        if (isEdit) {

            loadUser();

        }

    }, [id]);


    const loadUser = async () => {

        try {

            const response = await getUser(id);

            setFormData({

                username: response.username,

                first_name: response.first_name,

                last_name: response.last_name,

                email: response.email,

                password: "",

                is_active: response.is_active,

            });

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to load HR user.");

        }

    };


    const handleChange = (event) => {

        const {
            name,
            value,
            type,
            checked,
        } = event.target;

        setFormData({

            ...formData,

            [name]:
                type === "checkbox"
                    ? checked
                    : value,

        });


        setErrors({

            ...errors,

            [name]: "",

        });

    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        setErrors({});

        setLoading(true);


        try {

            let userData;


            if (isEdit) {

                userData = {

                    username: formData.username,

                    first_name: formData.first_name,

                    last_name: formData.last_name,

                    email: formData.email,

                    is_active: formData.is_active,

                };


                if (formData.password) {

                    userData.password =
                        formData.password;

                }


                await updateUser(
                    id,
                    userData
                );

                toast.success(
                    "HR updated successfully."
                );

            }

            else {

                userData = {

                    username: formData.username,

                    first_name: formData.first_name,

                    last_name: formData.last_name,

                    email: formData.email,

                    password: formData.password,

                };


                await createUser(userData);

                toast.success(
                    "HR created successfully."
                );

            }


            navigate("/users");

        }

        catch (error) {

            if (
                error.response?.status === 400
            ) {

                setErrors(
                    error.response.data
                );

            }

            else {

                toast.error(
                    "Something went wrong."
                );

            }

        }

        finally {

            setLoading(false);

        }

    };


    return (

        <DashboardLayout>

            <div className="user-form-page">


                {/* =========================
                    Page Header
                ========================== */}

                <div className="user-form-header">

                    <div>

                        <h2>

                            {isEdit
                                ? "Edit HR User"
                                : "Add HR User"
                            }

                        </h2>

                        <p>

                            {isEdit
                                ? "Update HR user account information."
                                : "Create a new HR user account."
                            }

                        </p>

                    </div>


                    <button
                        type="button"
                        className="user-form-back"
                        onClick={() =>
                            navigate("/users")
                        }
                    >

                        <FontAwesomeIcon
                            icon={faArrowLeft}
                        />

                        <span>
                            Back to HR Users
                        </span>

                    </button>

                </div>


                {/* =========================
                    Form Card
                ========================== */}

                <div className="user-form-card">


                    {/* Card Header */}

                    <div className="user-form-card-header">

                        <div className="user-form-icon">

                            <FontAwesomeIcon
                                icon={faUserShield}
                            />

                        </div>

                        <div>

                            <h3>
                                HR Account Information
                            </h3>

                            <p>
                                Enter the account details below.
                            </p>

                        </div>

                    </div>


                    <form onSubmit={handleSubmit}>


                        {/* =========================
                            Username
                        ========================== */}

                        <div className="user-form-group">

                            <label>

                                Username

                                <span>
                                    *
                                </span>

                            </label>


                            <div className="user-input-wrapper">

                                <FontAwesomeIcon
                                    icon={faUser}
                                    className="user-input-icon"
                                />

                                <input
                                    type="text"
                                    name="username"
                                    className={`form-control user-icon-input ${
                                        errors.username
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                    placeholder="Enter username"
                                    value={
                                        formData.username
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    disabled={isEdit}
                                />

                            </div>


                            {errors.username && (

                                <div className="user-form-error">

                                    {errors.username[0]}

                                </div>

                            )}


                            {isEdit && (

                                <small className="user-field-help">

                                    Username cannot be changed.

                                </small>

                            )}

                        </div>


                        {/* =========================
                            Name Row
                        ========================== */}

                        <div className="row g-3">


                            {/* First Name */}

                            <div className="col-md-6">

                                <div className="user-form-group">

                                    <label>

                                        First Name

                                        <span>
                                            *
                                        </span>

                                    </label>


                                    <div className="user-input-wrapper">

                                        <FontAwesomeIcon
                                            icon={faUser}
                                            className="user-input-icon"
                                        />

                                        <input
                                            type="text"
                                            name="first_name"
                                            className={`form-control user-icon-input ${
                                                errors.first_name
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            placeholder="First name"
                                            value={
                                                formData.first_name
                                            }
                                            onChange={
                                                handleChange
                                            }
                                        />

                                    </div>


                                    {errors.first_name && (

                                        <div className="user-form-error">

                                            {errors.first_name[0]}

                                        </div>

                                    )}

                                </div>

                            </div>


                            {/* Last Name */}

                            <div className="col-md-6">

                                <div className="user-form-group">

                                    <label>

                                        Last Name

                                        <span>
                                            *
                                        </span>

                                    </label>


                                    <div className="user-input-wrapper">

                                        <FontAwesomeIcon
                                            icon={faUser}
                                            className="user-input-icon"
                                        />

                                        <input
                                            type="text"
                                            name="last_name"
                                            className={`form-control user-icon-input ${
                                                errors.last_name
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            placeholder="Last name"
                                            value={
                                                formData.last_name
                                            }
                                            onChange={
                                                handleChange
                                            }
                                        />

                                    </div>


                                    {errors.last_name && (

                                        <div className="user-form-error">

                                            {errors.last_name[0]}

                                        </div>

                                    )}

                                </div>

                            </div>

                        </div>


                        {/* =========================
                            Email
                        ========================== */}

                        <div className="user-form-group">

                            <label>

                                Email Address

                                <span>
                                    *
                                </span>

                            </label>


                            <div className="user-input-wrapper">

                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className="user-input-icon"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    className={`form-control user-icon-input ${
                                        errors.email
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                    placeholder="Enter email address"
                                    value={
                                        formData.email
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>


                            {errors.email && (

                                <div className="user-form-error">

                                    {errors.email[0]}

                                </div>

                            )}

                        </div>


                        {/* =========================
                            Password
                        ========================== */}

                        <div className="user-form-group">

                            <label>

                                {isEdit
                                    ? "New Password"
                                    : "Password"
                                }

                                {!isEdit && (

                                    <span>
                                        *
                                    </span>

                                )}

                            </label>


                            <div className="user-password-wrapper">

                                <FontAwesomeIcon
                                    icon={faLock}
                                    className="user-password-icon"
                                />


                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    className={`form-control user-password-input ${
                                        errors.password
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                    placeholder={
                                        isEdit
                                            ? "Enter new password"
                                            : "Enter password"
                                    }
                                    value={
                                        formData.password
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />


                                <button
                                    type="button"
                                    className="password-toggle-btn"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    title={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >

                                    <FontAwesomeIcon
                                        icon={
                                            showPassword
                                                ? faEyeSlash
                                                : faEye
                                        }
                                    />

                                </button>

                            </div>


                            {errors.password && (

                                <div className="user-form-error">

                                    {errors.password[0]}

                                </div>

                            )}


                            {isEdit && (

                                <small className="user-field-help">

                                    Leave blank if you don't want to change the password.

                                </small>

                            )}

                        </div>


                        {/* =========================
                            Active Status
                        ========================== */}

                        {isEdit && (

                            <div className="user-status-setting">

                                <div className="user-status-setting-icon">

                                    <FontAwesomeIcon
                                        icon={faToggleOn}
                                    />

                                </div>


                                <div className="user-status-setting-content">

                                    <strong>
                                        Account Status
                                    </strong>

                                    <span>

                                        {formData.is_active
                                            ? "This user can login to the system."
                                            : "This user cannot login to the system."
                                        }

                                    </span>

                                </div>


                                <div className="form-check form-switch">

                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="is_active"
                                        name="is_active"
                                        checked={
                                            formData.is_active
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                    <label
                                        htmlFor="is_active"
                                        className="form-check-label"
                                    >

                                        {formData.is_active
                                            ? "Active"
                                            : "Inactive"
                                        }

                                    </label>

                                </div>

                            </div>

                        )}


                        {/* =========================
                            Actions
                        ========================== */}

                        <div className="user-form-actions">


                            <button
                                type="button"
                                className="user-cancel-btn"
                                onClick={() =>
                                    navigate("/users")
                                }
                                disabled={loading}
                            >

                                <FontAwesomeIcon
                                    icon={faArrowLeft}
                                />

                                Cancel

                            </button>


                            <button
                                type="submit"
                                className="user-save-btn"
                                disabled={loading}
                            >

                                <FontAwesomeIcon
                                    icon={
                                        loading
                                            ? faRotate
                                            : faSave
                                    }
                                    spin={loading}
                                />

                                {loading
                                    ? "Saving..."
                                    : isEdit
                                        ? "Update HR"
                                        : "Save HR"
                                }

                            </button>

                        </div>


                    </form>

                </div>

            </div>

        </DashboardLayout>

    );

}


export default UserForm;