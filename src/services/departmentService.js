import api from "./api";

export const getDepartments = async (
    page = 1,
    pageSize = 5,
    search = ""
) => {

    const params = new URLSearchParams();

    params.append("page", page);
    params.append("size", pageSize);

    if (search) {
        params.append("search", search);
    }

    const response = await api.get(
        `departments/?${params.toString()}`
    );

    return response.data;
};

export const getDepartmentOptions = async () => {

    const response = await api.get("departments/?all=true");

    return response.data;

};

export const getDepartment = async (id) => {

    const response = await api.get(`departments/${id}/`);

    return response.data;
};

export const createDepartment = async (data) => {

    const response = await api.post("departments/", data);

    return response.data;
};

export const updateDepartment = async (id, data) => {

    const response = await api.put(`departments/${id}/`, data);

    return response.data;
};

export const deleteDepartment = async (id) => {

    const response = await api.delete(`departments/${id}/`);

    return response.data;
};