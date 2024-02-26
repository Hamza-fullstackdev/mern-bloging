import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiInbox,
  HiShoppingBag,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";

const SidebarCom = () => {
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
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            active={tab === "profile"}
            href='#'
            icon={HiUser}
            label='user'
            labelColor='dark'
          >
            Profile
          </Sidebar.Item>
          <Sidebar.Item
            href='#'
            icon={HiViewBoards}
            label='Pro'
            labelColor='dark'
          >
            Kanban
          </Sidebar.Item>
          <Sidebar.Item href='#' icon={HiInbox} label='3'>
            Inbox
          </Sidebar.Item>
          <Sidebar.Item href='#' icon={HiUser}>
            Users
          </Sidebar.Item>
          <Sidebar.Item href='#' icon={HiShoppingBag}>
            Products
          </Sidebar.Item>
          <Sidebar.Item href='#' icon={HiArrowSmRight}>
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SidebarCom;
