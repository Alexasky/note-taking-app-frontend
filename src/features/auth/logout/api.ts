import API from '../../../shared/api/api';

export const logoutUser = async () => {
  try {
    const refreshToken = localStorage.getItem("accessToken");
    if (refreshToken) {
      await API.post("/auth/logout", { token: refreshToken }, { withCredentials: true });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  } catch (error) {
    console.error("Logout failed:", error);
  }
};