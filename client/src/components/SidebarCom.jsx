import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiDocumentText, HiUser } from "react-icons/hi";
import { useSelector } from "react-redux";
const SidebarCom = () => {
  const location = useLocation();
  const [tab, settab] = useState("");
  const { currentuser } = useSelector((state) => state.user);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      settab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to={"/dashboard?tab=profile"}>
            <Sidebar.Item
              active={tab === "profile"}
              as={"div"}
              icon={HiUser}
              label={currentuser.isAdmin?'Admin':'User'}
              labelColor='dark'
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentuser.isAdmin && (
            <Link to={"/dashboard?tab=posts"}>
              <Sidebar.Item
                active={tab === "posts"}
                as={"div"}
                icon={HiDocumentText}
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}
          <Sidebar.Item href='#' icon={HiArrowSmRight}>
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SidebarCom;
