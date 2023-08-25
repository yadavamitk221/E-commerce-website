import React, { useEffect } from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Protected from "./features/auth/components/Protected";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { selectLoggedInUser } from "./features/auth/authSlice";
import { UseSelector } from "react-redux/es/hooks/useSelector";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <HomePage />
      </Protected>
    ),
  },
  {
    path: "/Login",
    element: <LoginPage />,
  },
  {
    path: "/Signup",
    element: <SignupPage />,
  },
  {
    path: "/Cart",
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        {" "}
        <ProductDetailsPage />
      </Protected>
    ),
  },
  {
    path: "/Checkout",
    element: (
      <Protected>
        <Checkout />
      </Protected>
    ),
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
    }
  }, [dispatch, user]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
