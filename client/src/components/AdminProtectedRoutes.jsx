import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const AdminProtectedRoutes = () => {
    const { currentuser } = useSelector((state) => state.user);
  return (
    <div>
        {currentuser.isAdmin?<Outlet/>:<Navigate to={'/login'} />}
    </div>
  )
}

export default AdminProtectedRoutes