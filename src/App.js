import React from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";

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
    // Only for testing we are adding component and after that we will add the page.
    path: "/Cartpage",
    element: <CartPage/>,
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
