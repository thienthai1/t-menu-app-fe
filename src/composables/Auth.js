import { reactive, computed } from "vue";
import AxiosHandler from "./AxiosHandler";

const { axiosInstance } = AxiosHandler()

const state = reactive({
    user: null,
    accessToken: localStorage.getItem('access_token') || null,
    isAuthenticated: computed(() => !!state.accessToken),
})

const setAccessToken = async (token) => {
    state.accessToken = token;
    localStorage.setItem('access_token', token);
}

const logout = async () => {
    try {
        const response = await axiosInstance.post('/api/auth/logout')
        state.user = null;
        state.accessToken = null;
        localStorage.removeItem('access_token');
    } catch (error) {
        console.error('Error log user out: ', error);
    }
    
}

const logoutSidebar = async () => {
    try {
        const response = await axiosInstance.post('/api/auth/logout')
        state.user = null;
        state.accessToken = null;
        localStorage.removeItem('access_token');
    } catch (error) {
        console.error('Error log user out: ', error);
    }
    
}

export default { state, setAccessToken, logout }