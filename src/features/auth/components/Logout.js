import React from "react";
import { selectLoggedInUser, signOutUserAsync } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

function Logout() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    dispatch(signOutUserAsync());
  });

  //   but useEffect runs after render, se we have to delay navigation part
  return (
    <div>{!user[0] && <Navigate to={"/login"} replace={true}></Navigate>}</div>
  );
}

export default Logout;
