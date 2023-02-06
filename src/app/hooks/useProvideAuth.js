import { useState } from "react";

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const login = (token) => {
    localStorage.setItem("jwt", token);
    setUser(token);
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
  };

  // *For Verify Token
  const verify = () => {
    const token = localStorage.getItem("jwt");
    setUser(token);
  };

  return {
    user,
    login,
    logout,
    verify,
  };
}

export default useProvideAuth;
