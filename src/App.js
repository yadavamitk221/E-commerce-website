import React from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetailsPage from "./pages/ProductDetailsPage";

import { createBrowserRouter, RouterProvider, Route, Link} from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
  },
  {
    path: "/Login",
    element: <LoginPage/>,
  },
  {
    path: "/Signup",
    element: <SignupPage/>,
  },
  {
    path: "/Cart",
    element: <CartPage/>,
  },
  {
    path: "/product-detail",
    element: <ProductDetailsPage/>,
  },
  {
    path: "/Checkout",
    element:<Checkout/>,
  },
]);

function App() {
  return (
    <div className="App">
    <RouterProvider router={router} />
    </div>
  );
}

export default App;
