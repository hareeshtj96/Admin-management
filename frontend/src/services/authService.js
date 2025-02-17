import API from "../axios/axiosInstance";

const API_URL = import.meta.env.VITE_API_URL;

export const adminLogin = async (formData) => {
    try {
        const response = await API.post(`${API_URL}/login`, formData);
        const { accessToken, refreshToken, ...adminDetails } = response.data.admin;

        // save in localstorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("adminDetails", JSON.stringify(adminDetails));
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Invalid email or Password";
    }
};

export const changePassword = async (newPassword, confirmPassword) => {
    try {
        const response = await API.patch(`${API_URL}/updatePassword`, { newPassword, confirmPassword },
            { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` } }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong";
    }
};