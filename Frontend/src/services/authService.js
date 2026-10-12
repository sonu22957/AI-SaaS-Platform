import api from "./api";

function saveToken(data) {
  const token = data.token || data.data?.token || data.accessToken;

  if (token) {
    localStorage.setItem("token", token);
  }
}

export async function registerUser(formData) {
  const response = await api.post("/auth/register", formData);
  saveToken(response.data);
  return response.data;
}

export async function loginUser(formData) {
  const response = await api.post("/auth/login", formData);
  saveToken(response.data);
  return response.data;
}

export async function getUserProfile() {
  const response = await api.get("/users/profile");
  return response.data;
}

export function logoutUser() {
  localStorage.removeItem("token");
}