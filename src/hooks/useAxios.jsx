import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutSuccess } from "../features/authSlice";

const useAxios = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const axiosToken = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    headers: { Authorization: `Token ${token}` },
  });

  //* Veralteter Token: Das Backend antwortet mit 403 "You must log in".
  //* Dann im Browser abmelden und zur Login-Seite schicken.
  //* Andere 403-Meldungen (z. B. "You are not the owner") bleiben unberührt.
  axiosToken.interceptors.response.use(
    (response) => response,
    (error) => {
      const { status, data } = error.response || {};
      if (token && status === 403 && data?.message === "You must log in") {
        dispatch(logoutSuccess());
        toast.warn("Your session has expired. Please log in again.", {
          toastId: "session-expired", //* nur einmal anzeigen
        });
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  const axiosPublic = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
  });

  return { axiosToken, axiosPublic };
};

export default useAxios;
