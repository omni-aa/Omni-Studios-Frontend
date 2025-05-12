import { create } from "zustand";
import axios, { AxiosError } from "axios";

// Replace with your actual API URL
const API_URL = "http://localhost:8000";

// Ensure cookies are sent with requests
axios.defaults.withCredentials = true;

// Define the User type (replace with real fields)
interface User {
    id: string;
    email: string;
    name: string;
}

// Define the state and actions interface
interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    error: string | null;
    isLoading: boolean;
    isCheckingAuth: boolean;
    message: string | null;
    signup: (email: string, password: string, name: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    verifyEmail: (code: string) => Promise<void>;
    checkAuth: () => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (token: string, password: string) => Promise<void>;
}

// Zustand store
export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,

    signup: async (email, password, name) => {
        set({ isLoading: true, error: null });
        try {
            const res = await axios.post(`${API_URL}/auth/accountcreate`, { email, password, name });
            set({ user: res.data.user, isAuthenticated: true, isLoading: false });
        } catch (error: unknown) {
            if (error instanceof AxiosError)
                set({ error: error.response?.data.message || "Error signing up", isLoading: false });
            throw error;
        }
    },

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const res = await axios.post(`${API_URL}/auth/login`, { email, password });
            set({ user: res.data.user, isAuthenticated: true, isLoading: false });
        } catch (error: unknown) {
            if (error instanceof AxiosError)
                set({ error: error.response?.data.message || "Error logging in", isLoading: false });
            throw error;
        }
    },

    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            await axios.post(`${API_URL}/auth/logout`);
            set({ user: null, isAuthenticated: false, isLoading: false });
        } catch {
            set({ error: "Error logging out", isLoading: false });
        }
    },

    verifyEmail: async (code) => {
        set({ isLoading: true, error: null });
        try {
            const res = await axios.post(`${API_URL}/auth/verifyEmail`, { code });
            set({ user: res.data.user, isAuthenticated: true, isLoading: false });
        } catch (error: unknown) {
            if (error instanceof AxiosError)
                set({ error: error.response?.data.message || "Error verifying email", isLoading: false });
            throw error;
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const res = await axios.get(`${API_URL}/check-auth`);
            set({ user: res.data.user, isAuthenticated: true, isCheckingAuth: false });
        } catch {
            set({ isCheckingAuth: false, isAuthenticated: false });
        }
    },

    forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
            const res = await axios.post(`${API_URL}/forgot-password`, { email });
            set({ message: res.data.message, isLoading: false });
        } catch (error: unknown) {
            if (error instanceof AxiosError)
                set({
                    isLoading: false,
                    error: error.response?.data.message || "Error sending reset password email",
                });
            throw error;
        }
    },

    resetPassword: async (token, password) => {
        set({ isLoading: true, error: null });
        try {
            const res = await axios.post(`${API_URL}/reset-password/${token}`, { password });
            set({ message: res.data.message, isLoading: false });
        } catch (error: unknown) {
            if (error instanceof AxiosError)
                set({
                    isLoading: false,
                    error: error.response?.data.message || "Error resetting password",
                });
            throw error;
        }
    },
}));
