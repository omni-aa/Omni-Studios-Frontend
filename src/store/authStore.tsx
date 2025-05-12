import {create} from "zustand";
import axios from "axios";


const API_URL = "http://localhost:8000";

axios.defaults.withCredentials = true;

export const useAuthStore = Create((set)=>({
    user:null,
    isAuthenticated:false,
    error:null,
    isLoading:false,
    isCheckingAuth: true,
    message:null,

    signup: async(email,password,name) =>{
        set({isLoading:true,error:null});
        try{
            const response = await axios.post(`${API_URL}/auth/accountcreate`,{email,password,name});
            set({user:response.data.user,isAuthenticated:true,isLoading:false});
        }
    }

}))