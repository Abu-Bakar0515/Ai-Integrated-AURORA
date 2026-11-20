import { Routes, Route } from "react-router";
import Home from "../components/home";
import Shop from "../components/Shop";
import CartPage from "../components/CartPage";
import AboutPage from "../components/AboutPage";
import SearchPage from "../components/SearchPage";

function AppRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </div>
  );
}

export default AppRouter;
