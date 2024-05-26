import React from "react";
import { useState } from "react";
const BusinessLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [business, setBusiness] = useState("");
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="bg-white shadow-lg rounded-lg px-10 pt-6 pb-8 mb-4 w-full max-w-md"
      >
        <div className="flex justify-between text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Log In</h2>

          <p className="h-full p-1 rounded-md underline text-gray-700">
            user login
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Business Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="business"
            type="business"
            placeholder="Enter your business"
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
          />
        </div>
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
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password"
          >
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
        <div className="flex flex-col sm:flex-row  sm: gap-5 items-center justify-between">
          <button
            className="bg-green-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
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

export default BusinessLogin;
