import { create } from "zustand";
import axios, { AxiosError } from "axios";

const API_URL =
    import.meta.env.MODE === "development"
        ? "http://localhost:5000/api/auth"
        : "/api/auth";

axios.defaults.withCredentials = true;

// Define a User type (adjust fields to match your backend)
export interface User {
    id: string;
    email: string;
    name: string;
    isVerified: boolean;
    lastLogin: string | Date;
    createdAt: string | Date;
    // add other fields if your backend returns them
}

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
    verifyEmail: (code: string) => Promise<any>;
    checkAuth: () => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (token: string, password: string) => Promise<void>;
}

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
            const response = await axios.post<{ user: User }>(`${API_URL}/signup`, {
                email,
                password,
                name,
            });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            set({
                error: error.response?.data?.message || "Error signing up",
                isLoading: false,
            });
            throw err;
        }
    },

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post<{ user: User }>(`${API_URL}/login`, {
                email,
                password,
            });
            set({
                isAuthenticated: true,
                user: response.data.user,
                error: null,
                isLoading: false,
            });
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            set({
                error: error.response?.data?.message || "Error logging in",
                isLoading: false,
            });
            throw err;
        }
    },

    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            await axios.post(`${API_URL}/logout`);
            set({ user: null, isAuthenticated: false, error: null, isLoading: false });
        } catch (err) {
            set({ error: "Error logging out", isLoading: false });
            throw err;
        }
    },

    verifyEmail: async (code) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post<{ user: User }>(`${API_URL}/verify-email`, { code });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
            return response.data;
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            set({
                error: error.response?.data?.message || "Error verifying email",
                isLoading: false,
            });
            throw err;
        }
    },

    checkAuth: async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get<{ user: User }>(`${API_URL}/check-auth`);
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
        } catch {
            set({ error: null, isCheckingAuth: false, isAuthenticated: false });
        }
    },

    forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post<{ message: string }>(
                `${API_URL}/forgot-password`,
                { email }
            );
            set({ message: response.data.message, isLoading: false });
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            set({
                isLoading: false,
                error: error.response?.data?.message || "Error sending reset password email",
            });
            throw err;
        }
    },

    resetPassword: async (token, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post<{ message: string }>(
                `${API_URL}/reset-password/${token}`,
                { password }
            );
            set({ message: response.data.message, isLoading: false });
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            set({
                isLoading: false,
                error: error.response?.data?.message || "Error resetting password",
            });
            throw err;
        }
    },
}));
