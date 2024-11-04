import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { DOMAIN } from "../constants/index.js";

export const useAuthStore = create((set) => ({
  // state
  user: null,
  isSigningUp: false,
  isCheckingAuth: false,
  isLoggingOut: false,
  isLoggingIn: false,
  // mutations
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const res = await axios.post(`/api/v1/auth/signup`, credentials);
      if (res.data.success) {
        set({ user: res.data.user });
        toast.success("Account created successfully");
      }
    } catch (error) {
      toast.error(error.response.data.error || "Signup Failed");
      set({ user: null });
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const res = await axios.post(`/api/v1/auth/login`, credentials);
      if (res.data.success) {
        set({ user: res.data.user });
        toast.success("Login successfully");
      }
    } catch (error) {
      set({ user: null });
      console.log(error);
      toast.error(error.response.data.error || "Login Failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      const res = await axios.post(`/api/v1/auth/logout`);
      if (res.data.success) {
        set({ user: null });
        toast.success("Logout successfully");
      }
    } catch (error) {
      toast.error(error.response.data.error || "Logout Failed");
    } finally {
      set({ isLoggingOut: false });
    }
  },
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axios.get(`/api/v1/auth/authCheck`);
      if (res.data.success) {
        set({ user: res.data.user });
      }
    } catch (error) {
      console.log(error.response.data.error || "An error occured");
      set({ user: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
