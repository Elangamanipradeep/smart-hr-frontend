import api from "./api";

export const getDepartments = async () => {

    const response = await api.get("departments/");

    // console.log(response);
    

    return response.data;

};