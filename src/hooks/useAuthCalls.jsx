import { useNavigate } from "react-router-dom";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/authSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useDispatch } from "react-redux";
import useAxios from "./useAxios";

const useAuthCalls = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { axiosToken, axiosPublic } = useAxios();

  const login = async (userData) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.post("auth/login/", userData);
      dispatch(loginSuccess(data));
      toastSuccessNotify("login performed");
      navigate("/");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("An error occurred while logging in");
    }
  };
  const logout = async () => {
    dispatch(fetchStart());
    try {
      await axiosToken.get("/auth/logout/");
      dispatch(logoutSuccess());
      toastSuccessNotify("logout performed");
      navigate("/login");
    } catch (error) {
      toastErrorNotify("An error occurred while logging in");
      dispatch(fetchFail());
    }
  };
  const register = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.post("/users/", userInfo);
      dispatch(registerSuccess(data));
      toastSuccessNotify("login performed");
      navigate("/");
    } catch (error) {
      toastErrorNotify("An error occurred while logging in");
      console.log(error);
    }
  };
  return { login, logout, register };
};

export default useAuthCalls;
