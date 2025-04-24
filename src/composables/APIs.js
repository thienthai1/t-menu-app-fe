import AxiosHandler from "./AxiosHandler";
import Auth from "./Auth";
import axios from 'axios';

const { axiosInstance } = AxiosHandler();

const useAPIs = () => {

    const getAllFoods = async () => {
        try {
            const response = await axiosInstance.get(`/foods`)
            return response.data;
        } catch (error) {
            handleResponseStatus(error.response.status);
            console.log(error.response)
            throw error;
        }
    }

    const getFoodType = async () => {
        try {
            const response = await axiosInstance.get(`/foods/type`)
            return response.data;
        } catch (error) {
            handleResponseStatus(error.response.status);
            console.log(error.response)
            throw error;
        }
    }

    const login = async (email, password) => {
        try {
            const response = await axiosInstance.post('/auth/login', {
                email,
                password,
            });
            return response.data;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }
    
    const getProfile = async () => {
        try {
            const response = await axiosInstance.get(`/auth/profile`)
            return response.data;
        } catch (error) {
            handleResponseStatus(error.response.status);
            console.log(error.response)
            throw error;
        }
    }

    const getAllTable = async () => {
        try {
            const response = await axiosInstance.get('/tables')
            return response.data;
        } catch (error) {
            handleResponseStatus(error.response.status);
            console.log(error.response)
            throw error;
        }
    }

    const addFoodData = async (form) => {
        try {
            const response = await axiosInstance.post('/foods', form, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
            return response.data;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }

    const getFoodById = async (id) => {
        try {
            const response = await axiosInstance.get(`/foods/${id}`);
            return response.data;
        } catch (error) {
            handleResponseStatus(error.response.status);
            console.error('Failed to fetch food:', error);
            throw error;
        }
    }

    const updateFood = async (id, formData) => {
        try {
            const response = await axiosInstance.put(`/foods/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            handleResponseStatus(error.response.status);
            console.error('Failed to update food:', error);
            throw error;
        }
    }

    const getAllCategories = async () => {
        try {
            const response = await axiosInstance.get('/foods/type');
            return response.data;
        } catch (error) {
            handleResponseStatus(error.response.status);
            console.error('Failed to fetch categories:', error);
            throw error;
        }
    }

    const deleteFood = async (id) => {
        try {
            const response = await axiosInstance.delete(`/foods/${id}`);
            return response.data;
        } catch (error) {
            handleResponseStatus(error.response.status);
            console.error('Failed to delete food:', error);
            throw error;
        }
    }

    const getAllFoodOptionalGroup = async () => {
        try {
            const response = await axiosInstance.get('/food-optional-group');
            return response.data;
        } catch (error) {
            handleResponseStatus(error.response.status);
            console.error('Failed to fetch categories:', error);
            throw error;
        }
    }

    const getAllFoodOptional = async () => {
        try {
            const response = await axiosInstance.get('/food-optionals');
            return response.data;
        } catch (error) {
            handleResponseStatus(error.response.status);
            console.error('Failed to fetch categories:', error);
            throw error;
        }
    }

    const addFoodDataOptionalGroup = async (data) => {
        try {
            const response = await axiosInstance.post('/food-optional-group', data);
            return response.data;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }

    return { 
        getAllFoods,
        login,
        getFoodType,
        getAllTable,
        addFoodData,
        getFoodById,
        updateFood,
        getAllCategories,
        deleteFood,
        getProfile,
        getAllFoodOptionalGroup,
        addFoodDataOptionalGroup,
        getAllFoodOptional
    }

}

export default useAPIs