import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { DOMAIN } from "../constants/index.js";

export const useAuthStore = create((set) => ({
  // state
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  // mutations
  signup: async (credentials) => {
    set({ isSigningUp: true });
    const res = await axios.post(`${DOMAIN}/api/v1/auth/signup`, credentials);
    try {
      if (res.data.success) {
        set({ user: res.data.user });
        toast.success("Account created successfully");
      }
    } catch (error) {
      toast.error(error.response.data.message || "Signup Failed");
      set({ user: null });
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async () => {},
  logout: async () => {},
  authCheck: async () => {
    set({ isCheckingAuth: true });
    const res = await axios.get(`${DOMAIN}/api/v1/auth/authCheck`);
    try {
      if (res.data.success) {
        set({ user: res.data.user });
      }
    } catch (error) {
      toast.error(error.response.data.message || "An error occured");
      set({ user: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
