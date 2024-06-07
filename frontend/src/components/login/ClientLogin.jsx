import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { loginUser, logoutUser, registerUser } from "../../slice/authSlice";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../../actions/authActions";

const ClientLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
    // dispatch(logoutUser());
    // dispatch(getCurrentUser());
    // dispatch(registerUser({ email: "shruti@gmail.com", password: "shruti@123", name: "shruti pawar" }))
  };

  useEffect(() => {
    if (message) {
      console.log("Message from Redux state:", message);
    }
  }, [message]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg px-10 pt-6 pb-8 mb-4 w-full max-w-md"
      >
        <div className="flex justify-between text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Log In</h2>
          <p className="h-full p-1 rounded-md underline text-gray-700">
            Business Login
          </p>
        </div>

        {loading && (
          <div className="mb-4">
            <p className="text-gray-700 text-center">Loading...</p>
          </div>
        )}

        {error && (
          <div className="mb-4">
            <p className="text-red-500 text-center">Error: {message}</p>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:gap-5 items-center justify-between">
          <button
            className="bg-green-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            Log In
          </button>
          <div className="flex flex-col">
            <a
              className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800 mb-2"
              href="#"
            >
              Forgot Password?
            </a>
            <a
              className="inline-block align-baseline text-sm text-gray-700 hover:text-blue-800"
              href="#"
            >
              Don't have an account? Sign up now!
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ClientLogin;
