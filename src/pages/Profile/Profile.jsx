import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
    getProfile,
    updateProfile,
    changePassword,
} from "../../services/profileService";

import {
    faEye,
    faEyeSlash,
    faUser,
    faEnvelope,
    faLock,
    faShieldHalved,
    faPen,
    faSave,
    faXmark,
    faRotate,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Profile.css";


function Profile() {

    const role = localStorage.getItem("role");

    const [profile, setProfile] = useState(null);

    const [isEditing, setIsEditing] = useState(false);

    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);

    const [passwordLoading, setPasswordLoading] = useState(false);

    const [passwordData, setPasswordData] = useState({

        old_password: "",

        new_password: "",

        confirm_password: "",

    });

    const [passwordErrors, setPasswordErrors] = useState({});

    const [showPasswords, setShowPasswords] = useState({

        old_password: false,

        new_password: false,

        confirm_password: false,

    });


    useEffect(() => {

        loadProfile();

    }, []);


    const loadProfile = async () => {

        try {

            const response = await getProfile();

            setProfile(response);

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to load profile.");

        }

    };


    const handleChange = (event) => {

        const { name, value } = event.target;

        setProfile({

            ...profile,

            [name]: value,

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

            const profileData = {

                first_name: profile.first_name,

                last_name: profile.last_name,

                email: profile.email,

            };

            const response =
                await updateProfile(profileData);

            setProfile(response);

            setIsEditing(false);

            toast.success(
                "Profile updated successfully."
            );

        }

        catch (error) {

            console.log(error);

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


    const handleCancel = () => {

        setIsEditing(false);

        setErrors({});

        loadProfile();

    };


    const handlePasswordChange = (event) => {

        const { name, value } = event.target;

        setPasswordData({

            ...passwordData,

            [name]: value,

        });

        setPasswordErrors({

            ...passwordErrors,

            [name]: "",

        });

    };


    const handlePasswordSubmit = async (event) => {

        event.preventDefault();

        setPasswordErrors({});

        setPasswordLoading(true);

        try {

            const response =
                await changePassword(passwordData);

            toast.success(response.message);

            setPasswordData({

                old_password: "",

                new_password: "",

                confirm_password: "",

            });

        }

        catch (error) {

            if (
                error.response?.status === 400
            ) {

                setPasswordErrors(
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

            setPasswordLoading(false);

        }

    };


    const togglePasswordVisibility = (field) => {

        setShowPasswords({

            ...showPasswords,

            [field]:
                !showPasswords[field],

        });

    };


    if (!profile) {

        return (

            <DashboardLayout>

                <div className="profile-loading">

                    <div
                        className="spinner-border text-primary"
                        role="status"
                    >

                        <span className="visually-hidden">
                            Loading...
                        </span>

                    </div>

                    <span>
                        Loading profile...
                    </span>

                </div>

            </DashboardLayout>

        );

    }


    return (

        <DashboardLayout>

            <div className="profile-page">


                {/* =================================
                    Page Header
                ================================== */}

                <div className="profile-page-header">

                    <div>

                        <h2>
                            My Profile
                        </h2>

                        <p>
                            Manage your account information.
                        </p>

                    </div>


                    {!isEditing && (

                        <button
                            type="button"
                            className="profile-edit-btn"
                            onClick={() =>
                                setIsEditing(true)
                            }
                        >

                            <FontAwesomeIcon
                                icon={faPen}
                            />

                            Edit Profile

                        </button>

                    )}

                </div>


                {/* =================================
                    Profile Information
                ================================== */}

                <div className="profile-card">


                    <div className="profile-card-header">

                        <div className="profile-card-icon">

                            <FontAwesomeIcon
                                icon={faUser}
                            />

                        </div>

                        <div>

                            <h3>
                                Personal Information
                            </h3>

                            <p>
                                Your basic account information.
                            </p>

                        </div>

                    </div>


                    <form onSubmit={handleSubmit}>

                        <div className="row g-3">


                            {/* Username */}

                            <div className="col-md-6">

                                <div className="profile-field">

                                    <label>
                                        Username
                                    </label>

                                    <div className="profile-readonly">

                                        <FontAwesomeIcon
                                            icon={faUser}
                                        />

                                        <span>
                                            {profile.username}
                                        </span>

                                    </div>

                                </div>

                            </div>


                            {/* Role */}

                            <div className="col-md-6">

                                <div className="profile-field">

                                    <label>
                                        Role
                                    </label>

                                    <div className="profile-role">

                                        <FontAwesomeIcon
                                            icon={faShieldHalved}
                                        />

                                        <span>
                                            {profile.role}
                                        </span>

                                    </div>

                                </div>

                            </div>


                            {/* First Name */}

                            <div className="col-md-6">

                                <div className="profile-field">

                                    <label>

                                        First Name

                                        {isEditing && (
                                            <span className="required">
                                                *
                                            </span>
                                        )}

                                    </label>

                                    {isEditing ? (

                                        <input
                                            type="text"
                                            name="first_name"
                                            className={`form-control ${
                                                errors.first_name
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            value={
                                                profile.first_name
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="Enter first name"
                                        />

                                    ) : (

                                        <div className="profile-value">

                                            {profile.first_name || "-"}

                                        </div>

                                    )}

                                    {errors.first_name && (

                                        <div className="profile-error">

                                            {errors.first_name[0]}

                                        </div>

                                    )}

                                </div>

                            </div>


                            {/* Last Name */}

                            <div className="col-md-6">

                                <div className="profile-field">

                                    <label>

                                        Last Name

                                        {isEditing && (
                                            <span className="required">
                                                *
                                            </span>
                                        )}

                                    </label>

                                    {isEditing ? (

                                        <input
                                            type="text"
                                            name="last_name"
                                            className={`form-control ${
                                                errors.last_name
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            value={
                                                profile.last_name
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="Enter last name"
                                        />

                                    ) : (

                                        <div className="profile-value">

                                            {profile.last_name || "-"}

                                        </div>

                                    )}

                                    {errors.last_name && (

                                        <div className="profile-error">

                                            {errors.last_name[0]}

                                        </div>

                                    )}

                                </div>

                            </div>


                            {/* Email */}

                            <div className="col-md-6">

                                <div className="profile-field">

                                    <label>

                                        Email Address

                                        {isEditing && (
                                            <span className="required">
                                                *
                                            </span>
                                        )}

                                    </label>

                                    {isEditing ? (

                                        <div className="profile-input-wrapper">

                                            <FontAwesomeIcon
                                                icon={faEnvelope}
                                            />

                                            <input
                                                type="email"
                                                name="email"
                                                className={`form-control ${
                                                    errors.email
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                value={
                                                    profile.email
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                placeholder="Enter email address"
                                            />

                                        </div>

                                    ) : (

                                        <div className="profile-readonly">

                                            <FontAwesomeIcon
                                                icon={faEnvelope}
                                            />

                                            <span>
                                                {profile.email || "-"}
                                            </span>

                                        </div>

                                    )}

                                    {errors.email && (

                                        <div className="profile-error">

                                            {errors.email[0]}

                                        </div>

                                    )}

                                </div>

                            </div>

                        </div>


                        {/* Edit Actions */}

                        {isEditing && (

                            <div className="profile-form-actions">

                                <button
                                    type="button"
                                    className="profile-cancel-btn"
                                    onClick={handleCancel}
                                    disabled={loading}
                                >

                                    <FontAwesomeIcon
                                        icon={faXmark}
                                    />

                                    Cancel

                                </button>


                                <button
                                    type="submit"
                                    className="profile-save-btn"
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
                                        : "Save Changes"
                                    }

                                </button>

                            </div>

                        )}

                    </form>

                </div>


                {/* =================================
                    Change Password
                ================================== */}

                {role === "Admin" && (

                    <div className="profile-card password-card">


                        <div className="profile-card-header">

                            <div className="password-card-icon">

                                <FontAwesomeIcon
                                    icon={faLock}
                                />

                            </div>

                            <div>

                                <h3>
                                    Change Password
                                </h3>

                                <p>
                                    Update your account password.
                                </p>

                            </div>

                        </div>


                        <form
                            onSubmit={
                                handlePasswordSubmit
                            }
                        >


                            {/* Current Password */}

                            <div className="profile-field">

                                <label>
                                    Current Password
                                </label>

                                <div className="password-input-wrapper">

                                    <FontAwesomeIcon
                                        icon={faLock}
                                        className="password-input-icon"
                                    />

                                    <input
                                        type={
                                            showPasswords.old_password
                                                ? "text"
                                                : "password"
                                        }
                                        name="old_password"
                                        className={`form-control ${
                                            passwordErrors.old_password
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        value={
                                            passwordData.old_password
                                        }
                                        onChange={
                                            handlePasswordChange
                                        }
                                        placeholder="Enter current password"
                                    />

                                    <button
                                        type="button"
                                        className="password-eye-btn"
                                        onClick={() =>
                                            togglePasswordVisibility(
                                                "old_password"
                                            )
                                        }
                                    >

                                        <FontAwesomeIcon
                                            icon={
                                                showPasswords.old_password
                                                    ? faEyeSlash
                                                    : faEye
                                            }
                                        />

                                    </button>

                                </div>

                                {passwordErrors.old_password && (

                                    <div className="profile-error">

                                        {passwordErrors.old_password[0]}

                                    </div>

                                )}

                            </div>


                            {/* New Password */}

                            <div className="profile-field">

                                <label>
                                    New Password
                                </label>

                                <div className="password-input-wrapper">

                                    <FontAwesomeIcon
                                        icon={faLock}
                                        className="password-input-icon"
                                    />

                                    <input
                                        type={
                                            showPasswords.new_password
                                                ? "text"
                                                : "password"
                                        }
                                        name="new_password"
                                        className={`form-control ${
                                            passwordErrors.new_password
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        value={
                                            passwordData.new_password
                                        }
                                        onChange={
                                            handlePasswordChange
                                        }
                                        placeholder="Enter new password"
                                    />

                                    <button
                                        type="button"
                                        className="password-eye-btn"
                                        onClick={() =>
                                            togglePasswordVisibility(
                                                "new_password"
                                            )
                                        }
                                    >

                                        <FontAwesomeIcon
                                            icon={
                                                showPasswords.new_password
                                                    ? faEyeSlash
                                                    : faEye
                                            }
                                        />

                                    </button>

                                </div>

                                {passwordErrors.new_password && (

                                    <div className="profile-error">

                                        {passwordErrors.new_password[0]}

                                    </div>

                                )}

                            </div>


                            {/* Confirm Password */}

                            <div className="profile-field">

                                <label>
                                    Confirm Password
                                </label>

                                <div className="password-input-wrapper">

                                    <FontAwesomeIcon
                                        icon={faLock}
                                        className="password-input-icon"
                                    />

                                    <input
                                        type={
                                            showPasswords.confirm_password
                                                ? "text"
                                                : "password"
                                        }
                                        name="confirm_password"
                                        className={`form-control ${
                                            passwordErrors.confirm_password
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        value={
                                            passwordData.confirm_password
                                        }
                                        onChange={
                                            handlePasswordChange
                                        }
                                        placeholder="Confirm new password"
                                    />

                                    <button
                                        type="button"
                                        className="password-eye-btn"
                                        onClick={() =>
                                            togglePasswordVisibility(
                                                "confirm_password"
                                            )
                                        }
                                    >

                                        <FontAwesomeIcon
                                            icon={
                                                showPasswords.confirm_password
                                                    ? faEyeSlash
                                                    : faEye
                                            }
                                        />

                                    </button>

                                </div>

                                {passwordErrors.confirm_password && (

                                    <div className="profile-error">

                                        {passwordErrors.confirm_password[0]}

                                    </div>

                                )}

                            </div>


                            <div className="password-form-actions">

                                <button
                                    type="submit"
                                    className="profile-save-btn"
                                    disabled={passwordLoading}
                                >

                                    <FontAwesomeIcon
                                        icon={
                                            passwordLoading
                                                ? faRotate
                                                : faLock
                                        }
                                        spin={passwordLoading}
                                    />

                                    {passwordLoading
                                        ? "Updating..."
                                        : "Change Password"
                                    }

                                </button>

                            </div>

                        </form>

                    </div>

                )}

            </div>

        </DashboardLayout>

    );

}


export default Profile;