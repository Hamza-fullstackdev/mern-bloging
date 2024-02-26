import React, { useEffect, useState } from "react";
import Sidebar from "../components/SidebarCom";
import { useLocation } from "react-router-dom";
import Profile from "../components/Profile";
const Dashboard = () => {
  const location = useLocation();
  const [tab, settab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      settab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className=''>
        <Sidebar />
      </div>
      {tab === "profile" && <Profile />}
    </div>
  );
};

export default Dashboard;
