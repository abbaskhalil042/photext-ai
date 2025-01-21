import { createContext, useState } from "react";

export const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
  };

  return (
    <AppContext.Provider value={ value }>{children}</AppContext.Provider>
  );
};

export default AppProvider;
