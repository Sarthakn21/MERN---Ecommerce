import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { loginUser, logoutUser, registerUser } from "../../slice/authSlice";
import { getCurrentUser, loginUser, logoutUser, registerUser, updateProfile } from "../../actions/authActions";
import { addReview, categoryWiseProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../../actions/productActions";
import { addToCart, deleteItem, getCart, updateCart } from "../../actions/cartActions";

const ClientLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const { loading, error, message, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const product = {
    _id: "6660258e17f648e9e69a5ff7", // Assuming you have user._id accessible in your auth state
    name: "Addidas 130622"
  };
  const details = {
    "productId": "6669a6bf713ea089c4d31060",
    "comment": "!.just bought today,fully satisfied by it",
    "rating": 4.5
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(loginUser({ email, password }));
    // dispatch(logoutUser());
    // dispatch(getCurrentUser());
    // dispatch(registerUser({ email: "shruti@gmail.com", password: "shruti@123", name: "shruti pawar" }))
    // dispatch(updateProfile({ name: "aarti sathe", email: "aartisathe212@gmail.com" }))

    // dispatch(getAllProducts());
    // dispatch(getProductById("66604ddfe659659f4e51d569"))
    // dispatch(deleteProduct("6669fbff17132ffdd2e0d73b"))
    // dispatch(updateProduct(product));
    // dispatch(addReview(details));
    // dispatch(categoryWiseProduct());/
    // dispatch(addToCart({
    //   productId: "66617e882f8760f497c651a1"
    // }))
    // dispatch(getCart());
    // dispatch(updateCart(
    //   {
    //     productId: "66617e882f8760f497c651a1",
    //     quantity: 99
    //   }
    // ))
    // dispatch(deleteItem("66617e882f8760f497c651a1"))

  };

  useEffect(() => {
    console.log("Message from Redux state:", user);
    if (message) {
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
