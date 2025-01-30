import axios from "axios";

// Register User
export const register = async (userData: { name: string; email: string; password: string }) => {
  return axios.post("/api/auth/register", userData);
};

// Login User
export const login = async (credentials: { email: string; password: string }) => {
  const { data } = await axios.post("/api/auth/login", credentials, { withCredentials: true });
  return data;
};

// Get Logged-in User
export const getUser = async () => {
  try {
    const { data } = await axios.get("/api/auth/user", { withCredentials: true });
    return data;
  } catch {
    return null;
  }
};

// Logout User
export const logout = async () => {
  await axios.post("/api/auth/logout", {}, { withCredentials: true });
};
