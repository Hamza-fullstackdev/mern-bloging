import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footercom from "./components/Footercom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Createpost from "./pages/Createpost";
import AdminProtectedRoutes from "./components/AdminProtectedRoutes";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
          <Route element={<AdminProtectedRoutes />}>
            <Route path='/create-post' element={<Createpost />} />
          </Route>
        </Routes>
        <Footercom />
      </BrowserRouter>
    </div>
  );
};

export default App;
