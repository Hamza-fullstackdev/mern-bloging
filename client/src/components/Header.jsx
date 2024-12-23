import React from "react";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess,signoutFailure } from "../redux/user/userSlice";
const Header = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const { theme } = useSelector((state) => state.theme);
  const { currentuser } = useSelector((state) => state.user);
  const location = useLocation().pathname;

  //  Signout Functionality Starts Here
  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        credentials: "include",
        method: "POSt",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        navigate("/login");
      }
    } catch (error) {
      dispatch(signoutFailure(error));
    }
  };
  return (
    <Navbar className='border-b-2'>
      <Link
        to={"/"}
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
      >
        <span className='px-2 py-1 bg-gradient-to-r  from-pink-500  to-orange-400 text-white rounded'>
          Bloging
        </span>
        Application
      </Link>
      <form>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
        />
      </form>
      <Button className='lg:hidden w-12 h-10' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button
          className='w-12 h-10 hidden sm:inline'
          pill
          color='gray'
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        {currentuser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt='user' img={currentuser.avatar} />}
            className='rounded'
          >
            <Dropdown.Header>
              <span className='block text-sm'>{currentuser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentuser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to={"/signup"}>
            <Button pill gradientDuoTone={"purpleToBlue"} outline>
              Signup
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={location === "/"} as={"div"}>
          <Link to={"/"}>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={location === "/about"} as={"div"}>
          <Link to={"/about"}>About</Link>
        </Navbar.Link>
        <Navbar.Link active={location === "/projects"} as={"div"}>
          <Link to={"/projects"}>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
