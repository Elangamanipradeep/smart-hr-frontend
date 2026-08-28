import api from "./api";

export const getUsers = async (params) => {

    const response = await api.get(
        "/accounts/users/",
        {
            params,
        }
    );

    return response.data;
};


export const getUser = async (id) => {

    const response = await api.get(
        `/accounts/users/${id}/`
    );

    return response.data;
};


export const createUser = async (userData) => {

    const response = await api.post(
        "/accounts/users/",
        userData
    );

    return response.data;
};


export const updateUser = async (id, userData) => {

    const response = await api.put(
        `/accounts/users/${id}/`,
        userData
    );

    return response.data;
};


export const toggleHRStatus = async (id) => {

    const response = await api.delete(
        `/accounts/users/${id}/`
    );

    return response.data;

};