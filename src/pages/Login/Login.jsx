import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";

import { useEffect } from "react";

function Login() {  

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

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

            localStorage.setItem("access_token", response.access);
            localStorage.setItem("refresh_token", response.refresh);

            navigate("/dashboard");

        } catch (error) {

            alert("Invalid Username or Password");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-page">

            <div className="login-left">

                <div className="brand">

                    <h1>Smart HR</h1>

                    <p>Employee Management System</p>

                </div>

            </div>

            <div className="login-right">

                <div className="login-card">

                    <h2>Welcome Back</h2>

                    <p>Please login to continue</p>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label className="form-label">
                                Username
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter Username"
                            />

                        </div>

                        <div className="mb-4">

                            <label className="form-label">
                                Password
                            </label>

                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter Password"
                            />

                        </div>

                        <button
                            className="btn btn-primary w-100"
                            disabled={loading}
                        >

                            {loading ? "Logging In..." : "Login"}

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default Login;