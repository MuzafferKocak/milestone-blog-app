import axios from "axios";
import { useSelector } from "react-redux";

const useAxios = () => {
  const { token } = useSelector((state) => state.auth);

  const axiosToken = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    // baseURL: "https://39229.fullstack.clarusway.com/",
    headers: { Authorization: `Token ${token}` },
  });

  const axiosPublic = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    // baseURL: "https://39229.fullstack.clarusway.com/",
  });

  return { axiosToken, axiosPublic };
};

export default useAxios;
