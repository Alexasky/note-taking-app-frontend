import axios from 'axios';
import { API_URL_BASE } from '../../../shared/api/api';


const API_URL = `${API_URL_BASE}/auth`;

export const register = async ({ username, email, password }:{ username: string; email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
    name: username,
    email,
    password,
  });

    console.log("Registration successful:", response.data);
    
    const { user, accessToken, refreshToken } = response.data;

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    }

    return { user, accessToken };
  } catch (error) {
    console.error("Registration failed:", error);
  }
};

