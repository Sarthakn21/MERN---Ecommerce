import { useState } from "react";
import Example from "./Example";
import Navbar2 from "./components/Navbar/Navbar2";
import { Routes, Route } from "react-router-dom";
import ClientLogin from "./components/login/ClientLogin";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar2 />
      <Routes>
        <Route path="/" element={<Example />} />
        <Route path="/login" element={<ClientLogin />} />

      </Routes>
    </>
  );
}

export default App;
