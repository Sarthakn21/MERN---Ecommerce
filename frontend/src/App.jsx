import { useState } from "react";
import Example from "./Example";
import Navbar2 from "./components/Navbar/Navbar2";
import { Routes, Route } from "react-router-dom";
import ClientLogin from "./components/login/ClientLogin";
import HeroSection from "./components/Hero/HeroSection";
import Shop from "./components/Hero/Shop";
import FeatureItem from "./components/Product/Featured";
import ProductDetails from "./components/Product/ProductDetails";
import Product from "./components/Product/Product";
import Sidebar from "./components/Admin/Sidebar";
import CreateProduct from "./components/Product/CreateProduct";
import ProductList from "./components/Admin/ProductList";
import CartPage from "./components/Cart/CartPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar2 />

      {/* <Sidebar /> */}
      <Routes>
        <Route path="/" element={<ClientLogin />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin" element={<CreateProduct />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="product/:category" element={<Product />} />
        <Route path="product/detail/:productId" element={<ProductDetails />} />
        <Route path="/login" element={<ClientLogin />} />

      </Routes>
      {/* <ProductDetails />
      <Example /> */}
      {/* <FeatureItem /> */}

    </>
  );
}

export default App;
