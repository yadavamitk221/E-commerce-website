import React, { useEffect } from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Protected from "./features/auth/components/Protected";
import PageNotFound from "./pages/404";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { checkAuthAsync, selectLoggedInUser, selectUserChecked } from "./features/auth/authSlice";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import Logout from "./features/auth/components/Logout";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import AdminHomePage from "./pages/AdminHomePage";
import AdminProductDetailsPage from "./pages/AdminProductDetailsPage";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminOrderPage from "./pages/AdminOrderPage";
import StripeCheckout from "./pages/stripeCheckout";

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
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHomePage></AdminHomePage>
      </ProtectedAdmin>
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
    path: "/admin/product-detail/:id",
    element: (
      <ProtectedAdmin>
        {" "}
        <AdminProductDetailsPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedAdmin>
        <AdminOrderPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
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
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
  {
    path: "/order-success/:id",
    element: (
      <Protected>
        {" "}
        <OrderSuccessPage></OrderSuccessPage>
      </Protected>
    ),
  },
  {
    path: "/orders",
    element: (
      <Protected>
        <UserOrdersPage></UserOrdersPage>
      </Protected>
      // we will add pages later right now using components directly.
    ),
  },
  ,
  {
    path: "/forgot-password",
    element: (
      <ForgetPasswordPage></ForgetPasswordPage>
      // we will add pages later right now using components directly.
    ),
  },
  {
    path: "/user-profile",
    element: (
      <Protected>
        <UserProfilePage></UserProfilePage>
      </Protected>
      // we will add pages later right now using components directly.
    ),
  },
  {
    path: "/stripe-checkout/",
    element: (
      <Protected>
        <StripeCheckout></StripeCheckout>
      </Protected>
      // we will add pages later right now using components directly.
    ),
  },
  {
    path: "/logout",
    element: (
      <Protected>
        <Logout></Logout>
      </Protected>
      // we will add pages later right now using components directly.
    ),
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectUserChecked);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync());
      // we can get req.uer by token onbackend so no need to five in front-end
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, user]);
  return (
    <div className="App">
     {userChecked && <RouterProvider router={router} />}
    </div>
  );
}

export default App;
