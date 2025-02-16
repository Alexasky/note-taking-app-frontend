import axios from 'axios';
import { API_URL_BASE } from '../../../shared/api/api';

const API_URL = `${API_URL_BASE}/auth`;

export const login = async (credentials: { email: string, password: string }) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  const { accessToken, refreshToken } = response.data;

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    }
  return response.data;
};
