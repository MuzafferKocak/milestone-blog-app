import { useNavigate } from "react-router-dom"
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/authSlice"
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify"
import { useDispatch } from "react-redux"
import axios from "./useAxios"

const useAuthCalls = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const BASE_URL = "https://39229.fullstack.clarusway.com/"

  const login = async (url, userInfo) => {
    dispatch(fetchStart())
    try {
      const { data } = await axios.post(
        `${BASE_URL}users/auth/${url}/`,
        userInfo
      )
      dispatch(loginSuccess(data))
      toastSuccessNotify("login performed")
      navigate("/")
    } catch (error) {
      toastErrorNotify("An error occurred while logging in")
      dispatch(fetchFail())
    }
  }
  const logout = async (url) => {
    dispatch(fetchStart())
    try {
      await axios.post(`${BASE_URL}users/auth/${url}/`)
      dispatch(logoutSuccess())
      toastSuccessNotify("login performed")
      navigate("/login")
    } catch (error) {
      toastErrorNotify("An error occurred while logging in")
      dispatch(fetchFail())
    }
  }
  const register = async (url, userInfo) => {
    dispatch(fetchStart())
    try {
      const { data } = await axios.post(`${BASE_URL}users/${url}/`, userInfo)
      toastSuccessNotify("login performed")
      dispatch(registerSuccess(data))
      navigate("/")
    } catch (error) {
      toastErrorNotify("An error occurred while logging in")
      console.log(error)
    }
  }
  return { login, logout, register }
}

export default useAuthCalls