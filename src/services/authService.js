import api from "./api";

export const loginUser = async (loginData) => {
  const response = await api.post("accounts/login/", loginData);
  return response.data;
};

export const getProfile = async () => {

    const response = await api.get(
        "/accounts/profile/"
    );

    return response.data;

};