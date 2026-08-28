import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faArrowLeft,
    faBuilding,
    faSave,
    faRotate,
} from "@fortawesome/free-solid-svg-icons";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
    createDepartment,
    getDepartment,
    updateDepartment,
} from "../../services/departmentService";

import "./DepartmentForm.css";


function DepartmentForm() {

    const navigate = useNavigate();

    const { id } = useParams();

    const isEdit = Boolean(id);

    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({

        department_code: "",

        name: "",

        description: "",

    });


    useEffect(() => {

        if (isEdit) {

            loadDepartment();

        }

    }, [id]);


    const loadDepartment = async () => {

        try {

            const response = await getDepartment(id);

            setFormData(response);

        }

        catch (error) {

            console.log(error);

            toast.error(
                "Unable to load department."
            );

        }

    };


    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData({

            ...formData,

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

            const departmentData = {

                name: formData.name,

                description: formData.description,

            };


            if (isEdit) {

                await updateDepartment(
                    id,
                    departmentData
                );

                toast.success(
                    "Department updated successfully."
                );

            }

            else {

                await createDepartment(
                    departmentData
                );

                toast.success(
                    "Department created successfully."
                );

            }


            navigate("/departments");

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

            <div className="department-form-page">


                {/* Page Header */}

                {/* <div className="department-form-header">

                    <div>

                        <h2>

                            {isEdit
                                ? "Edit Department"
                                : "Add Department"
                            }

                        </h2>

                        <p>

                            {isEdit
                                ? "Update department information."
                                : "Add a new department to your organization."
                            }

                        </p>

                    </div>


                    <button
                        type="button"
                        className="department-form-back"
                        onClick={() =>
                            navigate("/departments")
                        }
                    >

                        <FontAwesomeIcon
                            icon={faArrowLeft}
                        />

                        <span>
                            Back to Departments
                        </span>

                    </button>

                </div> */}


                {/* Form Card */}

                <div className="department-form-card">


                    {/* Card Header */}

                    <div className="department-form-card-header">

                        <div className="department-form-icon">

                            <FontAwesomeIcon
                                icon={faBuilding}
                            />

                        </div>


                        <div>

                            <h3>
                                Department Information
                            </h3>

                            <p>
                                Enter the department details below.
                            </p>

                        </div>

                    </div>


                    <form onSubmit={handleSubmit}>


                        {/* Department Code */}

                        {isEdit && (

                            <div className="department-form-group">

                                <label>
                                    Department Code
                                </label>

                                <input
                                    type="text"
                                    className="form-control department-code-input"
                                    value={
                                        formData.department_code
                                    }
                                    disabled
                                />

                                <small className="department-field-help">

                                    Department code cannot be changed.

                                </small>

                            </div>

                        )}


                        {/* Department Name */}

                        <div className="department-form-group">

                            <label>

                                Department Name

                                <span>
                                    *
                                </span>

                            </label>

                            <input
                                type="text"
                                name="name"
                                className={`form-control ${
                                    errors.name
                                        ? "is-invalid"
                                        : ""
                                }`}
                                placeholder="Enter department name"
                                value={formData.name}
                                onChange={handleChange}
                            />

                            {errors.name && (

                                <div className="department-error">

                                    {errors.name[0]}

                                </div>

                            )}

                        </div>


                        {/* Description */}

                        <div className="department-form-group">

                            <label>
                                Description
                            </label>

                            <textarea
                                rows="5"
                                name="description"
                                className={`form-control ${
                                    errors.description
                                        ? "is-invalid"
                                        : ""
                                }`}
                                placeholder="Enter a short description about this department..."
                                value={
                                    formData.description
                                }
                                onChange={handleChange}
                            />

                            {errors.description && (

                                <div className="department-error">

                                    {errors.description[0]}

                                </div>

                            )}

                        </div>


                        {/* Buttons */}

                        <div className="department-form-actions">


                            <button
                                type="button"
                                className="department-cancel-btn"
                                onClick={() =>
                                    navigate("/departments")
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
                                className="department-save-btn"
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
                                        ? "Update Department"
                                        : "Save Department"
                                }

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </DashboardLayout>

    );

}


export default DepartmentForm;