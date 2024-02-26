import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { currentuser } = useSelector((state) => state.user);
  return <div>{currentuser ? <Outlet /> : <Navigate to={"/login"} />}</div>;
};

export default ProtectedRoutes;
