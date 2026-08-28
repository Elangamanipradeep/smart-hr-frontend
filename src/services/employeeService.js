import api from "./api";

export const getEmployees = async (
    page = 1,
    size = 5,
    search = "",
    department = "",
    status = "",
    ordering = ""
) => {

    const params = new URLSearchParams();

    params.append("page", page);
    params.append("size", size);

    if (search) {
        params.append("search", search);
    }

    if (department) {
        params.append("department", department);
    }

    if (status) {
        params.append("is_active", status);
    }

    if (ordering) {
        params.append("ordering", ordering);
    }

    const response = await api.get(
        `employees/?${params.toString()}`
    );

    return response.data;
};

export const createEmployee = async (employeeData) => {

    const response = await api.post(
        "employees/",
        employeeData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;

};

export const getEmployee = async (id) => {

    const response = await api.get(`employees/${id}/`);

    return response.data;

};

export const updateEmployee = async (id, employeeData) => {

    const response = await api.patch(

        `employees/${id}/`,
        employeeData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }

    );

    return response.data;

};

export const deleteEmployee = async (id) => {

    const response = await api.delete(`employees/${id}/`);

    return response.data;

};