import "./Login.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    faArrowRightToBracket,
    faChartLine,
    faEye,
    faEyeSlash,
    faLock,
    faShieldHalved,
    faUsers,
    faUser,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { loginUser, getProfile } from "../../services/authService";

import Swal from "sweetalert2";

import logo from "../../assets/smart-hr-logo-full.png";


function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        username: "",

        password: "",

    });

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);


    useEffect(() => {

        const token = localStorage.getItem("access_token");

        if (token) {

            navigate("/dashboard");

        }

    }, [navigate]);


    const handleChange = (event) => {

        setFormData({

            ...formData,

            [event.target.name]: event.target.value,

        });

    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            setLoading(true);

            const response = await loginUser(formData);

            localStorage.setItem(
                "access_token",
                response.access
            );

            localStorage.setItem(
                "refresh_token",
                response.refresh
            );

            const profile = await getProfile();

            localStorage.setItem(
                "role",
                profile.role
            );

            navigate("/dashboard");

        }

        catch (error) {

    console.log("LOGIN ERROR:", error);

    Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid Username or Password.",
        confirmButtonColor: "#2563eb",
    });

}

        finally {

            setLoading(false);

        }

    };


    return (

        <div className="login-page">


            {/* =========================================
                LEFT BRANDING SECTION
            ========================================= */}

            <div className="login-left">

                {/* Decorative background elements */}

                <div className="login-decoration decoration-top"></div>

                <div className="login-decoration decoration-circle"></div>

                <div className="login-dots login-dots-top"></div>


                <div className="login-brand-content">

                    <img
                        src={logo}
                        alt="Smart HR"
                        className="login-logo"
                    />


                    <div className="login-brand-line"></div>


                    <h2>

                        Manage your workforce

                        <br />

                        smarter, faster and easier.

                    </h2>


                    {/* Benefits */}

                    <div className="login-features">


                        <div className="login-feature">

                            <div className="feature-icon">

                                <FontAwesomeIcon
                                    icon={faShieldHalved}
                                />

                            </div>

                            <div>

                                <h4>

                                    Secure & Reliable

                                </h4>

                                <p>

                                    Your data is protected

                                    <br />

                                    with enterprise-grade security.

                                </p>

                            </div>

                        </div>


                        <div className="login-feature">

                            <div className="feature-icon">

                                <FontAwesomeIcon
                                    icon={faChartLine}
                                />

                            </div>

                            <div>

                                <h4>

                                    Smart & Efficient

                                </h4>

                                <p>

                                    Powerful tools to manage

                                    <br />

                                    your employees with ease.

                                </p>

                            </div>

                        </div>


                        <div className="login-feature">

                            <div className="feature-icon">

                                <FontAwesomeIcon
                                    icon={faUsers}
                                />

                            </div>

                            <div>

                                <h4>

                                    Connected Workforce

                                </h4>

                                <p>

                                    Bring your team together

                                    <br />

                                    and achieve more.

                                </p>

                            </div>

                        </div>


                    </div>

                </div>


                {/* Bottom decorative waves */}

                <div className="login-waves">

                    <span></span>

                    <span></span>

                    <span></span>

                    <span></span>

                    <span></span>

                </div>


                <div className="login-dots login-dots-bottom"></div>

            </div>


            {/* =========================================
                RIGHT LOGIN SECTION
            ========================================= */}

            <div className="login-right">

                <div className="login-form-wrapper">


                    <div className="login-card">


                        {/* Login Icon */}

                        <div className="login-lock-icon">

                            <FontAwesomeIcon
                                icon={faLock}
                            />

                        </div>


                        {/* Header */}

                        <div className="login-header">

                            <h1>

                                Welcome Back

                            </h1>

                            <p>

                                Sign in to your Smart HR account

                            </p>

                        </div>


                        <div className="login-divider"></div>


                        {/* Form */}

                        <form onSubmit={handleSubmit}>


                            {/* Username */}

                            <div className="login-form-group">

                                <label>

                                    Username

                                </label>


                                <div className="login-input-wrapper">

                                    <FontAwesomeIcon
                                        icon={faUser}
                                        className="login-input-icon"
                                    />

                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="Enter your username"
                                        autoComplete="username"
                                        required
                                    />

                                </div>

                            </div>


                            {/* Password */}

                            <div className="login-form-group">

                                <label>

                                    Password

                                </label>


                                <div className="login-input-wrapper">

                                    <FontAwesomeIcon
                                        icon={faLock}
                                        className="login-input-icon"
                                    />

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        required
                                    />


                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        aria-label={
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

                            </div>


                            {/* Options */}

                            {/* <div className="login-options">

                                <label className="remember-me">

                                    <input
                                        type="checkbox"
                                    />

                                    <span>

                                        Remember me

                                    </span>

                                </label>


                                <span className="forgot-password">

                                    Forgot password?

                                </span>

                            </div> */}


                            {/* Login Button */}

                            <button
                                type="submit"
                                className="login-button"
                                disabled={loading}
                            >

                                <FontAwesomeIcon
                                    icon={faArrowRightToBracket}
                                />

                                <span>

                                    {
                                        loading
                                            ? "Logging In..."
                                            : "Login"
                                    }

                                </span>

                            </button>


                        </form>


                        {/* Card Footer */}

                        <div className="login-card-footer">

                            <FontAwesomeIcon
                                icon={faShieldHalved}
                            />

                            <span>

                                Smart HR Employee Management System

                            </span>

                        </div>

                    </div>


                    <div className="login-copyright">

                        © 2026 Smart HR. All rights reserved.

                    </div>

                </div>

            </div>

        </div>

    );

}


export default Login;