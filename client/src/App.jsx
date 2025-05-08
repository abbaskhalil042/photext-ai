import { Route, Routes } from "react-router-dom";
import BuyCredit from "./pages/BuyCredit";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import { ThemeProvider } from "./components/theme-provider";
const App = () => {
  const { showLogin } = useContext(AppContext);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div
        className="px-4 sm:px-10 md:px-20 lg:px-35 min-h-screen bg-[#f0f1ea]"
      >
        <ToastContainer position="bottom-right" />
        <Navbar />

        {showLogin && <Login />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Result />} />
          <Route path="/buy-credit" element={<BuyCredit />} />
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
