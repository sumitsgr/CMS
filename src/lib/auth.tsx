import { configureAuth } from "react-query-auth";
import { api } from "./api-client";
import { Navigate, useLocation } from "react-router";
import { z } from "zod";
import { paths } from "../config/paths";

const loginWithEmailAndPassword = (data) => {
  return api.post("/api/auth/login", data);
};

const getUser = async () => {
  const user = localStorage.getItem("user");
  if (!user) return null;
  return JSON.parse(user);
};

const logout = async (): Promise<void> => {
  await api.post("/api/auth/logout");
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
};

export const loginInputSchema = z.object({
  mobile: z.string().min(10, "Enter valid mobile number"),
  password: z.string().min(5, "Required"),
});

const authConfig = {
  userFn: getUser,
  loginFn: async (data) => {
    const response = await loginWithEmailAndPassword(data);

    console.log(response); // you'll see full object here

    const { user, token } = response;

    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));

    return user;
  },
  logoutFn: logout,
};

export const { useUser, useLogin, useLogout, AuthLoader } =
  configureAuth(authConfig);

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const location = useLocation();

  if (!user.data) {
    return (
      <Navigate to={paths.auth.login.getHref(location.pathname)} replace />
    );
  }

  return children;
};
