import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [credit, setCredit] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const loadCreditData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
        headers: { token },
      });

      console.log(data);

      if (data.success) {
        setCredit(data.credits);
        setUser(data.user);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/image/generate-image`,
        { prompt },
        {
          headers: { token },
        }
      );

      if (data.success) {
        loadCreditData();
        toast.success(data.message);
        return data.resultImage; // ✅ Ensure this always returns a value
        
      } else {
        toast.error(data.message);
        loadCreditData();
        if (data.credits === 0) {
          navigate("/buy");
        }
        return null; // ✅ Ensure function returns something
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
      return null; // ✅ Ensure function returns something even on error
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setToken("");
    setUser(null);
  };

  useEffect(() => {
    if (token) {
      loadCreditData();
    }
  }, [token]);
  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditData,
    logout,
    generateImage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
