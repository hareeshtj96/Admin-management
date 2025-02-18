import API from "../axios/axiosInstance";

const API_URL = import.meta.env.VITE_API_URL;

// admin login function
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

// change password function
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

// get sales by month function
export const getSalesByMonth = async () => {
    try {
        const response = await API.get(`${API_URL}/getByMonth`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong";
    }
};

// get recent sales function
export const getRecentSales = async () => {
    try {
        const response = await API.get(`${API_URL}/recentSales`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong";
    }
};

// get transactions
export const getTransactions = async () => {
    try {
        const response = await API.get(`${API_URL}/transaction`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong";
    }
};

// get stats
export const getStats = async () => {
    try {
        const response = await API.get(`${API_URL}/getStats`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong";
    }
}

// get sales by region
export const getSalesByRegion = async () => {
    try {
        const response = await API.get(`${API_URL}/getByRegion`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong";
    }
}

// get total subscription by plan
export const getByPlan = async () => {
    try {
        const response = await API.get(`${API_URL}/getByPlan`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong";
    }
}

