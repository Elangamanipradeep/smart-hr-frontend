import { useNavigate, useParams } from "react-router-dom";

import {
    createEmployee,
    getEmployee,
    updateEmployee,
} from "../../services/employeeService";

import { toast } from "react-toastify";

import "./EmployeeForm.css";

import { useEffect, useState } from "react";

import { getDepartmentOptions } from "../../services/departmentService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faImage,
    faUpload,
    faSave,
    faRotate,
} from "@fortawesome/free-solid-svg-icons";


function EmployeeFormComponent() {

    const [departments, setDepartments] = useState([]);

    const navigate = useNavigate();

    const { id } = useParams();

    const [formData, setFormData] = useState({

        full_name: "",
        email: "",
        phone: "",
        designation: "",
        salary: "",
        joining_date: "",
        is_active: true,
        profile_photo: null,
        department: "",

    });

    const [previewImage, setPreviewImage] = useState("");

    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);


    useEffect(() => {

        loadDepartments();

        if (id) {

            loadEmployee();

        }

    }, [id]);


    const loadDepartments = async () => {

        try {

            const response = await getDepartmentOptions();

            setDepartments(response);

        }

        catch (error) {

            console.log(error);

        }

    };


    const loadEmployee = async () => {

        try {

            const employee = await getEmployee(id);

            setFormData({

                full_name: employee.full_name,
                email: employee.email,
                phone: employee.phone,
                designation: employee.designation,
                salary: employee.salary,
                joining_date: employee.joining_date,
                is_active: employee.is_active,
                profile_photo: null,
                department: employee.department,

            });

            setPreviewImage(employee.profile_photo);

        }

        catch (error) {

            console.log(error);

        }

    };


    const handleChange = (event) => {

        const {
            name,
            value,
            type,
            checked,
            files,
        } = event.target;


        if (type === "file") {

            const file = files[0];

            if (!file) return;

            setFormData({

                ...formData,

                profile_photo: file,

            });

            setPreviewImage(

                URL.createObjectURL(file)

            );

            setErrors({

                ...errors,

                profile_photo: "",

            });

            return;

        }


        setFormData({

            ...formData,

            [name]:
                type === "checkbox"
                    ? checked
                    : value,

        });


        // Clear the error for the field being edited

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

            const employeeData = new FormData();


            Object.keys(formData).forEach((key) => {

                // Don't send empty profile photo

                if (
                    key === "profile_photo" &&
                    !formData.profile_photo
                ) {

                    return;

                }

                employeeData.append(
                    key,
                    formData[key]
                );

            });


            if (id) {

                await updateEmployee(
                    id,
                    employeeData
                );

                toast.success(
                    "Employee updated successfully."
                );

            }

            else {

                await createEmployee(
                    employeeData
                );

                toast.success(
                    "Employee created successfully."
                );

            }


            navigate("/employees");

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


    return (

        <div className="employee-form-card">


            {/* Header */}

            <div className="mb-4">

                <h2>

                    Employee Information

                </h2>

                <p className="text-muted">

                    {id
                        ? "Update the employee information below."
                        : "Enter the employee information below."
                    }

                </p>

            </div>


            <form onSubmit={handleSubmit}>


                <div className="row">


                    {/* Full Name */}

                    <div className="col-md-6 mb-3">

                        <label>
                            Full Name *
                        </label>

                        <input
                            type="text"
                            className={`form-control ${
                                errors.full_name
                                    ? "is-invalid"
                                    : ""
                            }`}
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                        />

                        {errors.full_name && (

                            <div className="invalid-feedback d-block">

                                {errors.full_name[0]}

                            </div>

                        )}

                    </div>


                    {/* Email */}

                    <div className="col-md-6 mb-3">

                        <label>
                            Email *
                        </label>

                        <input
                            type="email"
                            className={`form-control ${
                                errors.email
                                    ? "is-invalid"
                                    : ""
                            }`}
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                        {errors.email && (

                            <div className="invalid-feedback d-block">

                                {errors.email[0]}

                            </div>

                        )}

                    </div>


                    {/* Phone */}

                    <div className="col-md-6 mb-3">

                        <label>
                            Phone *
                        </label>

                        <input
                            type="text"
                            className={`form-control ${
                                errors.phone
                                    ? "is-invalid"
                                    : ""
                            }`}
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />

                        {errors.phone && (

                            <div className="invalid-feedback d-block">

                                {errors.phone[0]}

                            </div>

                        )}

                    </div>


                    {/* Department */}

                    <div className="col-md-6 mb-3">

                        <label>
                            Department *
                        </label>

                        <select
                            className={`form-select ${
                                errors.department
                                    ? "is-invalid"
                                    : ""
                            }`}
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                        >

                            <option value="">

                                Select Department

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


                        {errors.department && (

                            <div className="invalid-feedback d-block">

                                {errors.department[0]}

                            </div>

                        )}

                    </div>


                    {/* Designation */}

                    <div className="col-md-6 mb-3">

                        <label>
                            Designation *
                        </label>

                        <input
                            type="text"
                            className={`form-control ${
                                errors.designation
                                    ? "is-invalid"
                                    : ""
                            }`}
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                        />

                        {errors.designation && (

                            <div className="invalid-feedback d-block">

                                {errors.designation[0]}

                            </div>

                        )}

                    </div>


                    {/* Salary */}

                    <div className="col-md-6 mb-3">

                        <label>
                            Salary *
                        </label>

                        <input
                            type="number"
                            className={`form-control ${
                                errors.salary
                                    ? "is-invalid"
                                    : ""
                            }`}
                            name="salary"
                            value={formData.salary}
                            onChange={handleChange}
                        />

                        {errors.salary && (

                            <div className="invalid-feedback d-block">

                                {errors.salary[0]}

                            </div>

                        )}

                    </div>


                    {/* Joining Date */}

                    <div className="col-md-6 mb-3">

                        <label>
                            Joining Date *
                        </label>

                        <input
                            type="date"
                            className={`form-control ${
                                errors.joining_date
                                    ? "is-invalid"
                                    : ""
                            }`}
                            name="joining_date"
                            value={formData.joining_date}
                            onChange={handleChange}
                        />

                        {errors.joining_date && (

                            <div className="invalid-feedback d-block">

                                {errors.joining_date[0]}

                            </div>

                        )}

                    </div>


                    {/* Active Employee */}

                    <div className="col-md-6 mb-3 d-flex align-items-center">

                        <div className="form-check mt-4">

                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="is_active"
                                checked={formData.is_active}
                                onChange={handleChange}
                            />

                            <label className="form-check-label">

                                Active Employee

                            </label>

                        </div>

                    </div>


                    {/* Profile Photo */}

                    <div className="col-12 mb-4">

                        <label className="form-label fw-semibold">

                            Profile Photo (Optional)

                        </label>


                        <input
                            id="profile_photo"
                            type="file"
                            name="profile_photo"
                            hidden
                            accept="image/*"
                            onChange={handleChange}
                        />


                        {errors.profile_photo && (

                            <div className="invalid-feedback d-block">

                                {errors.profile_photo[0]}

                            </div>

                        )}


                        <label
                            htmlFor="profile_photo"
                            className="file-upload-box"
                        >

                            <div className="file-info">

                                <span className="file-icon">

                                    <FontAwesomeIcon
                                        icon={faImage}
                                    />

                                </span>


                                <span className="file-name">

                                    {
                                        formData.profile_photo

                                            ? formData.profile_photo.name

                                            : previewImage

                                                ? previewImage
                                                    .split("/")
                                                    .pop()

                                                : "Choose Profile Photo"
                                    }

                                </span>

                            </div>


                            <span className="browse-btn">

                                <FontAwesomeIcon
                                    icon={faUpload}
                                />

                                <span>

                                    Browse

                                </span>

                            </span>

                        </label>


                        {/* Image Preview */}

                        {previewImage && (

                            <div className="photo-preview-card mt-4">

                                <img
                                    src={previewImage}
                                    alt="Employee Preview"
                                    className="employee-preview"
                                />


                                <h6 className="mt-3 mb-1">

                                    {
                                        formData.full_name ||
                                        "Employee Name"
                                    }

                                </h6>


                                <small className="text-muted">

                                    {
                                        formData.profile_photo

                                            ? formData.profile_photo.name

                                            : previewImage
                                                .split("/")
                                                .pop()
                                    }

                                </small>

                            </div>

                        )}

                    </div>

                </div>


                {/* Buttons */}

                <div className="d-flex justify-content-end gap-3">


                    <button
                        type="button"
                        className="btn btn-secondary"
                        disabled={loading}
                        onClick={() =>
                            navigate("/employees")
                        }
                    >

                        Cancel

                    </button>


                    <button
                        type="submit"
                        className="btn btn-primary"
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

                        {" "}

                        {loading

                            ? (
                                id
                                    ? "Updating..."
                                    : "Saving..."
                            )

                            : (
                                id
                                    ? "Update Employee"
                                    : "Save Employee"
                            )

                        }

                    </button>

                </div>


            </form>

        </div>

    );

}


export default EmployeeFormComponent;