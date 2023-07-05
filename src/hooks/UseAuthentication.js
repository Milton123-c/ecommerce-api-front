import axios from "axios";
import { useState } from "react";

const UseAuthentication = () => {
  const [showError, setShowError] = useState();
  const [userExit, setUserExit] = useState()
 
  
  const URL_BASE = import.meta.env.VITE_REACT_APP_URL

  const createNewUser = (data) => {
    const url = `${URL_BASE}/users`;
    axios
      .post(url, data)
      .then((res) => {
        setShowError(false)
        setUserExit(res)
    })
      .catch((error) => {
        console.log(error.data);
        setShowError(true)
        setUserExit(error.response.data.error)
    });
  };
  const loginUser = (data) => {
   const url = `${URL_BASE}/users/login`;
    axios
      .post(url, data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data));
        setShowError(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setShowError(true);
      });
  };
  return { createNewUser, loginUser, showError, setShowError, userExit, setUserExit };
};
export default UseAuthentication;
