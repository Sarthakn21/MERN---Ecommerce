import { useState, useEffect } from "react";
import Navbar2 from "./components/Navbar/Navbar2";
import { Routes, Route } from "react-router-dom";
import ClientLogin from "./components/login/ClientLogin";
import Shop from "./components/Hero/Shop";
import ProductDetails from "./components/Product/ProductDetails";
import Product from "./components/Product/Product";
import CreateProduct from "./components/Product/CreateProduct";
import ProductList from "./components/Admin/ProductList";
import CartPage from "./components/Cart/CartPage";
import Sidebar from "./components/Admin/Sidebar";
import HeroSection from "./components/Hero/HeroSection";
import Dashboard from "./components/Admin/Dashboard";
import Register from "./components/login/Register";
import SellerRegister from "./components/login/SellerRegister";
import Checkout from "./components/Checkout/Checkout";
import { useSelector } from "react-redux";

function App() {
  const [count, setCount] = useState(0);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <>
      {user && user.role == "admin" ? "" : <Navbar2 />}

      {/* <Sidebar /> */}
      <Routes>
        {user && user.role == "admin" ? (
          <Route path="/" element={<Dashboard />} />
        ) : (
          <Route path="/" element={<HeroSection />} />
        )}
        <Route path="/login" element={<ClientLogin />} />
        <Route path="/register" element={<Register />} />
        {user && user.role == "admin" ? (
          <Route path="/sellerregister" element={<SellerRegister />} />
        ) : (
          <Route path="/sellerregister" element={<HeroSection />} />
        )}
        {user && user.role == "admin" ? (
          <Route path="/admin/createproduct" element={<CreateProduct />} />
        ) : (
          <Route path="/admin/createproduct" element={<HeroSection />} />
        )}
        <Route path="/admin/productlist" element={<ProductList />} />
        {user && user.role == "admin" ? (
          <Route path="/admin/dashboard" element={<Dashboard />} />
        ) : (
          <Route path="/admin/dashboard" element={<HeroSection />} />
        )}
        <Route path="/shop" element={<Shop />} />
        <Route path="product/:category" element={<Product />} />
        <Route path="product/detail/:productId" element={<ProductDetails />} />
        {user ? (
          <Route path="/cart" element={<CartPage />} />
        ) : (
          <Route path="/cart" element={<HeroSection />} />
        )}
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      {/* <ProductDetails />
      <Example /> */}
      {/* <FeatureItem /> */}
    </>
  );
}

export default App;
