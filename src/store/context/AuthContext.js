import { createContext, useState } from "react";

const authContextDefaultValues = {
  user: null,
  isAuthenticated: false,
  toggleAuth: () => null,
};

export const AuthContext = createContext(authContextDefaultValues);

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState({
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated: localStorage.getItem("auth") === "true" || false,
  });

  const toggleAuth = (user) => {
    setIsLoggedIn({
      user: user,
      isAuthenticated: !isLoggedIn.isAuthenticated,
    });

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("auth", !isLoggedIn.isAuthenticated);
  };

  return (
    <AuthContext.Provider value={{ ...isLoggedIn, toggleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
