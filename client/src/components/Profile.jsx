import { Button, TextInput } from "flowbite-react";
import React from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const { currentuser } = useSelector((state) => state.user);
  return (
    <div className='max-w-lg mx-auto w-full mt-10'>
      <form className='flex flex-col p-4'>
        <h2 className='text-2xl font-semibold text-center mb-4'>
          My Profile
        </h2>
        <div className='self-center rounded-full shadow-md cursor-pointer overflow-hidden'>
          <img
            src={currentuser.avatar}
            alt='user'
            className='rounded-full w-full h-full border-4 border-gray-300 object-cover'
          />
        </div>
        <div className='mt-5'>
          <TextInput type="text" value={currentuser.username} icon={FaUser} />
        </div>
        <div className='mt-2'>
          <TextInput type="email" value={currentuser.email} icon={MdEmail} />
        </div>
        <div className='mt-2'>
          <TextInput type="password" placeholder="********" icon={IoMdLock} />
        </div>
        <div className="mt-3 flex justify-between">
            <Link><Button color="red">Delete Account</Button></Link>
            <Link><Button color="yellow">Sign Out</Button></Link>
        </div>
      </form>
    </div>
  );
};

export default Profile;
