import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import ClientLogin from "./components/login/ClientLogin";
import BusinessLogin from "./components/login/BusinessLogin";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <ClientLogin /> */}
      <BusinessLogin />
    </>
  );
}

export default App;
