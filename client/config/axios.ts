import Axios from "axios";
import { useAuth } from "hooks/auth.hook";
import { API_URL } from "./api";

export const axios = Axios.create({
  baseURL: API_URL,
});

useAuth.subscribe<string>(
  (token) => {
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    console.log("HEADER UPDATED");
  },
  (state) => state.token
);
