import { useState } from "react";
import Example from "./Example";
import Navbar2 from "./components/Navbar/Navbar2";
import { Routes, Route } from "react-router-dom";
import ClientLogin from "./components/login/ClientLogin";
import HeroSection from "./components/Hero/HeroSection";
import Shop from "./components/Hero/Shop";
import FeatureItem from "./components/Product/Featured";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex flex-col">
        <Navbar2 />

        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/example" element={<Example />} />
          <Route path="/login" element={<ClientLogin />} />

        </Routes>
        {/* <Example />
        <FeatureItem /> */}
      </div>
    </>
  );
}

export default App;
