import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion as Motion } from "framer-motion";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Navbar from "./components/Navbar";
import Collection from "./pages/Collection";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import PlaceOrder from "./pages/PlaceOrder";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import About from "./pages/About";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { Toaster } from "react-hot-toast";
import WelcomePage from "./pages/WelcomePage";
import Profile from "./pages/Profile";

const App = () => {
  const location = useLocation();

  const isWelcomePage = location.pathname === "/";

  return (
    <>
      <Toaster />

      <AnimatePresence mode="wait">
        {isWelcomePage ? (
          <Motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <WelcomePage />
          </Motion.div>
        ) : (
          <Motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="min-h-screen bg-base"
          >
            <Navbar />
            <SearchBar />
            <main className="mx-auto w-full max-w-7xl px-section-x pb-section">
              <Routes location={location}>
                <Route path="/home" element={<Home />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/product/:productId" element={<Product />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/placeOrder" element={<PlaceOrder />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </main>
            <Footer />
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default App;
