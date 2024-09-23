import { createContext, useEffect, useState } from "react";
import { me } from "../data/Fetch";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userInfo, setUserInfo] = useState();

  const getMe = async () => {
    try {
      const meInfo = await me();
      setUserInfo(meInfo);
    } catch (error) {
      if (error.message === "401") {
        localStorage.removeItem("token");
        setToken(null);
      }
    }
  };
  useEffect(() => {
    if (token) getMe();
  }, [token]);
  const value = { token, setToken, userInfo };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
