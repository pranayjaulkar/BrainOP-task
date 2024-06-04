import axios from "axios";

const API = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const getPosts = async (page, limit) => {
  const res = await API({
    method: "get",
    url: `/posts?page=${page || ""}&limit=${limit || ""}`,
  });
  return res.data;
};

export const getUser = async () => {
  const res = await API.get("/user");
  return res.data;
};

export const SignIn = async (userData) => {
  const res = await API.post("/user/login", {
    email: userData.email,
    password: userData.password,
  });
  return res.data;
};
export const SignUp = async (userData) => {
  const res = await API.post("/user/sign-up", {
    email: userData.email,
    password: userData.password,
    name: userData.name,
    profilePicture: { url: userData.profilePicture.url },
  });
  return res.data;
};
export const logout = async () => {
  await API.get("/user/logout");
};
