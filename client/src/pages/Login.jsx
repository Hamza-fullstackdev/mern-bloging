import React from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import {Link} from 'react-router-dom';
const Login = () => {
  return (
    <div className='min-h-screen mt-20'>
      <div className='mx-auto max-w-md p-4'>
        <h2 className='text-2xl font-semibold text-center mb-2'>
          Login to your account
        </h2>
        <form className='mt-3 flex flex-col'>
          <div className='mt-1'>
            <Label value={"Your Email"} />
            <TextInput
              type='email'
              placeholder='youremail@gmail.com'
              rightIcon={AiOutlineMail}
              className='w-100'
            />
          </div>
          <div className='mt-1'>
            <Label value={"Your Password"} />
            <TextInput
              type='password'
              placeholder='********'
              rightIcon={RiLockPasswordLine}
              className='w-100'
            />
          </div>
          <Button type='submit' gradientDuoTone={'purpleToBlue'} className="mt-4">Submit</Button>
          <span className="text-sm mt-1">Dont have a account? <Link className="text-green-500" to={'/signup'}>Signup now</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Login;
